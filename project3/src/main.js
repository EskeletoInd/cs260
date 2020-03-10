import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  deckID: null,
  remaining: 0,
  getDeck(numberOfDecks = 1) {
    return new Promise((resolve, reject) => {
      fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=" + numberOfDecks)
      .then((response) => {
        return response.json();
      }).then((response) => {
        console.log(response);
        this.deckID = response.deck_id;
        this.remaining = response.remaining;
      }).then(() => resolve())
      .catch((e) => reject(e));
    });
  },
  drawCard(count = 1) {
    return new Promise((resolve, reject) => {
      if (this.deckID === null || this.remaining === 0) {
        this.getDeck();
      }
      console.log(this.deckID);
      fetch("https://deckofcardsapi.com/api/deck/" + this.deckID + "/draw/?count=" + count)
        .then((response) => {
          response.text().then((text) => console.log(text));
          response.json()
        })
        .then((response) => {
          this.remaining = response.remaining;
          return response.cards;
        }).then((cards) => {
          resolve(cards);
        }).catch((e) => reject(e));
    });
  },
  reshuffleDeck() {
    fetch("https://deckofcardsapi.com/api/deck/" + this.deckID + "/shuffle/")
      .then((response) => response.json())
      .then((response) => {
        this.remaining = response.remaining;
      });
  },
}

new Vue({
  router, //http://deckofcardsapi.com/
  data,
  render: h => h(App)
}).$mount('#app')
