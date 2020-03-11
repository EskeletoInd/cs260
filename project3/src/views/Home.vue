<template>
<div class="home">
  <h1>We will be playing some simple card games.</h1>
  <div class="myCards">
    <CardViewer :cards="this.hand"></CardViewer>
  </div>
  <button @click="drawCard()" name="drawCard">Draw a Card</button>
  <div class="explanation">
    <h2>Blackjack</h2>
    <p>
      Equally well known as Twenty-One. The rules are simple, the play is thrilling, and there is opportunity for high strategy.
      In fact, for the expert player who mathematically plays a perfect game and is able to count cards, the odds are sometimes in that player's favor to win.
    </p>
    <h2>OldMaid</h2>
    <p>
      Old Maid is a constant favorite with children and lots of fun for families playing cards together.
      Colorful decks made especially for the game are popular, but regardless of the playing cards used, the rules are the same.
    </p>
  </div>
</div>
</template>

<script>
import CardViewer from "../components/CardViewer.vue"
export default {
  name: 'Home',
  components: {
    CardViewer,
  },
  data() {
    return {
      hand: [],
    }
  },
  methods: {
    drawCard() {
      let promise = this.$root.$data.drawCard();
      promise.then((cards) => {
        for (let i in cards) {
          this.hand.push(cards[i]);
        }
      })
    }
  }
}
</script>

<style>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.myCards {
  min-height: 158px;
  min-width: 75%;
  margin-bottom: 10px;
}

.explanation {
  width: 75%;
}
</style>
