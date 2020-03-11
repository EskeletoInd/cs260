<template>
<div class="oldmaid">
  <h1>OldMaid</h1>
  <h2>Dealer Hand</h2>
  <CardViewer :cards="dealerHand" :hidden="true"></CardViewer>
  <h2>Player Hand</h2>
  <CardViewer :cards="playerHand"></CardViewer>
  <div class="buttons">
    <button @click="playerDrawCard()">Draw</button>
    <button @click="deal()">Reset</button>
  </div>
  <div v-if="this.gameover">
    <h1 v-if="this.win">Congratulations</h1>
    <h1 v-else>Sorry, Better Luck Next Time</h1>
  </div>
  <div class="explanation">
    <h2>Object of the Game</h2>
    <p>
      The goal is to form and discard pairs of cards, and not to be left with the odd card at the end.
    </p>
    <h2>The Play</h2>
    <p>
      Each player removes all pairs from his hand face down.
      If a player has three-of-a-kind, they remove only two of those three cards.
      The dealer then offers their hand, spread out face down, to the player on the left, who draws one card from it.
      This player discards any pair that may have been formed by the drawn card.
      The player then offers their own hand to the player on their left.
      Play proceeds in this way until all cards have been paired except one which cannot be paired - and the player who has that card is the Old Maid!
      The Odd card out will be the Ace of Spades.
    </p>
  </div>
</div>
</template>


<script>
import CardViewer from "../components/CardViewer.vue"
export default {
  components: {
    CardViewer,
  },
  data() {
    return {
      gameover: false,
      win: false,
      drawLock: false,
      playerHand: [],
      dealerHand: [],
    }
  },
  methods: {
    getRandom(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    removeMatch(hand) {
      for (let i in hand) {
        for (let j in hand) {
          if (i !== j && hand[i].code.substr(0, 1) === hand[j].code.substr(0, 1)) {
            let a = hand[j];
            hand.splice(i, 1);
            hand.splice(hand.indexOf(a), 1);
            return true;
          }
        }
      }
      return false;
    },
    removeMatches(hand) {
      let foundMatch = true;
      while (foundMatch) {

        foundMatch = this.removeMatch(hand);
      }
    },
    deal() {
      this.$root.$data.deckID = null;
      this.gameover = false;
      this.playerHand = [];
      this.dealerHand = [];
      let counter = 0;
      this.$root.$data.drawCard(52, 1).then((cards) => {
        for (let i in cards) {
          if (cards[i].code === "AC" || cards[i].code === "AH" || cards[i].code === "AD") {
            continue;
          }
          if (counter % 2 === 0) {
            this.playerHand.push(cards[i]);
          } else {
            this.dealerHand.push(cards[i]);
          }
          counter += 1;
        }
        this.removeMatches(this.playerHand);
        this.removeMatches(this.dealerHand);
      });
    },
    playerDrawCard() {
      if (!(this.drawLock) && !(this.gameover)) {
        this.drawLock = true;
        let rando = this.getRandom(this.dealerHand.length);
        let card = this.dealerHand[rando];
        this.dealerHand.splice(rando, 1);
        this.playerHand.push(card);
        new Promise((resolve) => {
          setTimeout(function() {
            resolve();
          }, 1000)
        }).then(() => {
          this.removeMatches(this.playerHand);
        }).then(() => {
          setTimeout(function() {
            return;
          }, 1000)
        }).then(() => {
          if (this.checkWin()) {
            this.dealerDrawCard();
          }
        })
      }
    },
    dealerDrawCard() {
      let rando = this.getRandom(this.playerHand.length);
      let card = this.playerHand[rando];
      this.playerHand.splice(rando, 1);
      this.dealerHand.push(card);
      this.removeMatches(this.dealerHand);
      this.drawLock = false;
      this.checkWin();
    },
    checkWin() {
      if (this.playerHand.length === 1 && this.dealerHand.length === 0) {
        this.gameover = true;
        this.win = false;
        return false;
      } else if (this.playerHand.length === 0 && this.dealerHand.length === 1) {
        this.gameover = true;
        this.win = true;
        return false;
      }
      return true;
    }
  },
  computed: {},
  created: function() {
    this.deal();
  },
}
</script>

<style>
.oldmaid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.buttons {
  margin-top: 10px;
}
</style>
