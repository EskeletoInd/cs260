<template>
  <div class="cards">
    <div class="cardholder" v-for="card in cards" :key="card.code">
      <img class="card" :src="card.image">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cards: Array,
    },
  }
</script>

<style>
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
