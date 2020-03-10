<template>
<div class="blackjack">
  <h1>This Page will be a game of Blackjack</h1>
</div>
</template>

<script>
export default {
  data() {
    return {
      playerHand: [],
      dealerHand: [],
    }
  },
  methods: {
    playerDrawCard() {
      playerHand.append(drawCard());
      if (playerHand() > 21) {
        // Player Bust!
      }
    },
    playDealer() {
      while (dealerScore() < 16) {
        dealerHand.append(drawCard);
      }
      scoreGame();
    },
    scoreGame() {
      if (dealerScore() > 21) {
        // Dealer Bust
      } else if (dealerScore() > playerScore()) {
        // Dealer Win
      } else if (dealerScore() === playerScore()) {
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
      for (let index in playerHand) {
        let value = playerHand[index].value;
        if (value === "KING" || value === "QUEEN" || value === "JACK") {
          total.map(x => x + 10);
        } else if (value === "ACE") {

        } else {
          total.map(x => x += parseInt(value));
        }
      }
      return total;
    },
    dealerScore() {},
  }
}
</script>
