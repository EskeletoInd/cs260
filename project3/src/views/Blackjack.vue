<template>
<div class="blackjack">
  <h1>This Page will be a game of Blackjack</h1>
</div>
</template>

<script>
export default {
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
      this.data.playerHand.append(this.$root.methods.drawCard());
      if (this.computed.playerScore() > 21) {
        // Player Bust!
      }
    },
    playDealer() {
      while (this.computed.dealerScore() < 16) {
        this.data.dealerHand.append(this.$root.methods.drawCard());
      }
      this.methods.scoreGame();
    },
    scoreGame() {
      if (this.computed.dealerScore() > 21) {
        // Dealer Bust
      } else if (this.computed.dealerScore() > this.computed.playerScore()) {
        // Dealer Win
      } else if (this.computed.dealerScore() === this.computed.playerScore()) {
        // Dealer Win by Tie
      } else {
        // Player Win
      }
    },
    restartGame() {

    },
  },
  computed: {
    playerScore() {
      let total = [0];
      for (let index in this.data.playerHand) {
        let value = this.data.playerHand[index].value;
        if (value === "KING" || value === "QUEEN" || value === "JACK") {
          total.map(x => x + 10);
        } else if (value === "ACE") {
          total.map(x => x + 1);
        } else {
          total.map(x => x += parseInt(value));
        }
      }
      return total;
    },
    dealerScore() {return 0;},
  }
}
</script>
