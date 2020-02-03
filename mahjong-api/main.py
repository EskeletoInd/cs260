from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from mahjong.hand_calculating.hand import HandCalculator
from mahjong.tile import TilesConverter
from mahjong.hand_calculating.hand_config import HandConfig
from mahjong.meld import Meld

app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)
parser = reqparse.RequestParser()


class ScoreHand(Resource):
    def post(self):
        parser.add_argument("body", type=str)
        parser.add_argument('winTile', type=str)
        args = parser.parse_args()
        return {'hello': 'word'}


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
