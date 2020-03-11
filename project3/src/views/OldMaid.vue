<template>
<div class="oldmaid">
  <h1>OldMaid</h1>
  <CardViewer :cards="dealerHand"></CardViewer>
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
      playerHand: [],
      dealerHand: [],
    }
  },
  methods: {
    removeMatches(hand) {
      while (true) {
        for (let i in hand) {
          for (let j in hand) {
            if (i !== j && hand[i].code.substr(0, 1) === hand[i].code.substr(0, 1)) {
              hand.delete(i);
              hand.delete(i);
              continue;
            }
          }
        }
        break;
      }
    },
    deal() {
      this.$root.$data.deckID = null;
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
.oldmaid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.cards {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.cardholder {
  margin: 10px;
  width: 110px;
}

.card {
  border: 2px solid black;
  height: 150px;
  width: 100px;
  object-fit: fill;
}
</style>
