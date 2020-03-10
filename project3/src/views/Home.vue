<template>
  <div class="home">
    <h1>We will be playing some simple card games.</h1>
    <CardViewer :cards="this.hand"></CardViewer>
    <button @click="drawCard()" name="drawCard">Draw a Card</button>
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
</style>
