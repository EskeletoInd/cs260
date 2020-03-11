<template>
<div class="cards">
  <div class="cardholder" v-for="card in cards" :key="card.code">
    <img v-if="hidden" class="card" src="https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695">
    <img v-else class="card" :src="card.image">
  </div>
</div>
</template>

<script>
export default {
  props: {
    cards: Array,
    hidden: Boolean,
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
  background-color: #1a4a1c;
  overflow: hidden;
  border-radius: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.cardholder {
  margin: 10px;
  width: 110px;
  margin: 0;
}

.card {
  border: 2px solid #308834;
  height: 150px;
  width: 100px;
  object-fit: fill;
}
</style>
