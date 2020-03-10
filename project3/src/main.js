import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

data = {
  deckID: null,
  remaining: 0,
  getDeck(numberOfDecks = 1) {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=" + numberOfDecks)
      .then(response) {
        return response.json();
      }.then(response) {
        deckID = response.deck_id;
        remaining = response.remaining;
      }
  },
  drawCard(count = 1) {
    if (deckID === null || remaining === 0) {
      getDeck();
    }
    fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=" + count)
      .then(response) {
        return response.json();
      }.then(response) {
        remaining = response.remaining;
        return response.cards;
      }
  },
  reshuffleDeck() {
    fetch("https://deckofcardsapi.com/api/deck/" + deckID + "/shuffle/")
      .then(response) {
        return response.json();
      }.then(response) {
        remaining = response.remaining;
      }
  },
}

new Vue({
  router, //http://deckofcardsapi.com/
  data,
  render: h => h(App)
}).$mount('#app')