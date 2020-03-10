<template>
<div class="blackjack">
  <h1>Blackjack</h1>
  <div class="dealerHand">
    <CardViewer :cards="dealerHand"></CardViewer>
    <h2>Dealer Score: {{dealerScore}}</h2>
  </div>
  <div class="playerHand">
    <CardViewer :cards="playerHand"></CardViewer>
    <h2>Player Score: {{playerScore}}</h2>
  </div>
  <div class="buttonHolder">
    <button @click="playerDrawCard()" :disabled="this.gameover" name="button">Hit Me!</button>
    <button @click="playDealer()" :disabled="this.gameover" name="button">Stand!</button>
    <button @click="restartGame()" name="button">Reset</button>
  </div>
  <div v-if="this.gameover">
    <div v-if="this.win">
      <h2>Congratulations!</h2>
    </div>
    <div v-else>
      <h2>Better Luck Next Time!</h2>
    </div>
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
      playerHand: [],
      dealerHand: [],
    }
  },
  methods: {
    playerDrawCard() {
      let promise = this.$root.$data.drawCard();
      promise.then((cards) => {
        for (let i in cards) {
          this.playerHand.push(cards[i]);
        }
        if (this.playerScore > 21) {
          this.scoreGame();
        }
      })
    },
    playDealer() {
      let promise = this.$root.$data.drawCard(8);
      promise.then((cards) => {
        for (let i in cards) {
          this.dealerHand.push(cards[i]);
          if (this.dealerScore >= 16) {
            break;
          }
        }
        this.scoreGame();
      })
    },
    scoreGame() {
      this.gameover = true;
      if ((this.dealerScore > 21) || ((this.dealerScore < this.playerScore) && (this.playerScore <= 21))) {
        this.win = true;
      }
    },
    restartGame() {
      this.gameover = false;
      this.win = false;
      this.playerHand = [];
      this.dealerHand = [];
      let promise = this.$root.$data.drawCard(2);
      promise.then((cards) => {
        for (let i in cards) {
          this.playerHand.push(cards[i]);
        }
      })
      promise = this.$root.$data.drawCard();
      promise.then((cards) => {
        for (let i in cards) {
          this.dealerHand.push(cards[i]);
        }
      })
    },
  },
  computed: {
    playerScore() {
      let ace = false;
      let total = 0;
      for (let index in this.playerHand) {
        let value = this.playerHand[index].value;
        if (value === "KING" || value === "QUEEN" || value === "JACK") {
          total += 10;
        } else if (value === "ACE") {
          ace = true;
          total += 1;
        } else {
          total += parseInt(value);
        }
      }
      if (ace && total + 10 <= 21) {
        return total + 10;
      } else {
        return total;
      }
    },
    dealerScore() {
      let ace = false;
      let total = 0;
      for (let index in this.dealerHand) {
        let value = this.dealerHand[index].value;
        if (value === "KING" || value === "QUEEN" || value === "JACK") {
          total += 10;
        } else if (value === "ACE") {
          ace = true;
          total += 1;
        } else {
          total += parseInt(value);
        }
      }
      if (ace && total + 10 <= 21) {
        return total + 10;
      } else {
        return total;
      }
    },
  },
  created: function() {
    this.$root.$data.deckID = null;
    let promise = this.$root.$data.drawCard(2, 6);
    promise.then((cards) => {
      for (let i in cards) {
        this.playerHand.push(cards[i]);
      }
    })
    promise = this.$root.$data.drawCard();
    promise.then((cards) => {
      for (let i in cards) {
        this.dealerHand.push(cards[i]);
      }
    })
  },
}
</script>

<style>
  .blackjack {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
