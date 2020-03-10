<template>
  <div class="home">
    <h1>We will be playing some simple card games.</h1>
    <div class="cardholder">

    </div>
    <button @click="drawCard()" name="drawCard">Draw a Card</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
      });
    }
  }
}
</script>
