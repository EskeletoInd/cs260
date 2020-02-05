from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from mahjong.hand_calculating.hand import HandCalculator
from mahjong.tile import TilesConverter
from mahjong.hand_calculating.hand_config import HandConfig
from mahjong.meld import Meld
import json

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()

calculator = HandCalculator()


def to_tiles(obj):
    return TilesConverter.string_to_136_array(man=obj['man'], pin=obj['pin'], sou=obj['sou'], honors=obj['honors'])


def score(args):
    win_tile = to_tiles(args['winTile'])[0]
    tiles = to_tiles(args['tiles'])

    melds = []
    for i in args['melds']:
        if i['type'] == 'chi':
            melds.append(Meld(Meld.CHI, tiles=to_tiles(i), opened=i['opened']))
        elif i['type'] == 'pon':
            melds.append(Meld(Meld.PON, tiles=to_tiles(i), opened=i['opened']))
        elif i['type'] == 'kan':
            melds.append(Meld(Meld.KAN, tiles=to_tiles(i), opened=i['opened']))
        elif i['type'] == 'chankan':
            melds.append(Meld(Meld.CHANKAN, tiles=to_tiles(i), opened=i['opened']))
        elif i['type'] == 'nuki':
            melds.append(Meld(Meld.NUKI, tiles=to_tiles(i), opened=i['opened']))

    dora_ind = []
    for i in args['doraIndicators']:
        dora_ind.append(to_tiles(i)[0])

    options = args['options']
    config = HandConfig(player_wind=options['playerWind'], round_wind=options['roundWind'],
                        is_tsumo=options['isTsumo'], is_riichi=options['isRiichi'], is_daburu_riichi=options['isDoubleRiichi'],
                        is_ippatsu=options['isIppatsu'], is_rinshan=options['isRinshan'], is_chankan=options['isChankan'],
                        is_haitei=options['isHaitei'], is_houtei=options['isHoutei'], is_nagashi_mangan=options['isNagashiMangan'],
                        is_tenhou=options['isTenhou'], is_renhou=options['isRenhou'], is_chiihou=options['isChiihou'])
    result = calculator.estimate_hand_value(tiles, win_tile, melds=melds, dora_indicators=dora_ind, config=config)

    opened = False
    for i in melds:
        if i.opened:
            opened = True

    return result, opened


def packageScore(score, opened):
    to_return = {}
    if score.error is not None:
        to_return['error'] = score.error
        return to_return
    to_return['cost'] = {
        'main': score.cost['main'],
        'additional': score.cost['additional']
    }
    to_return['fu'] = score.fu
    to_return['error'] = str(score.error)
    to_return['han'] = score.han
    to_return['fuDetails'] = []
    for i in score.fu_details:
        to_return['fuDetails'].append({
            'fu': i['fu'],
            'reason': i['reason']
        })
    to_return['yaku'] = []
    for i in score.yaku:
        to_return['yaku'].append({
            'yaku': i.han_open if opened else i.han_closed,
            'reason': i.english,
            'japaneseReason': i.name
        })

    return to_return


class ScoreHand(Resource):
    def post(self):
        parser.add_argument("body", type=str, location='body')
        parser.add_argument('winTile', type=str, location='body')
        args = json.loads(request.data)
        results, opened = score(args)
        results = packageScore(results, opened)
        return results


class Test(Resource):
    def get(self):
        return {'hello': 'word'}


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


api.add_resource(Test, '/')
api.add_resource(ScoreHand, '/ScoreHand')

if __name__ == '__main__':
    app.run(debug=True)
