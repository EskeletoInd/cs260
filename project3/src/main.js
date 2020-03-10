import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  deckID: null,
  remaining: 0,
  getDeck(numberOfDecks = 1) {
    let promise = new Promise((resolve, reject) => {
      fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=" + numberOfDecks)
        .then((response) => response.json())
        .then((response) => {
          this.deckID = response.deck_id;
          this.remaining = response.remaining;
          return response.deckID;
        }).then((deckID) => resolve(deckID))
        .catch((e) => reject(e));
    });
    return promise;
  },
  async drawCard(count = 1, numberOfDecks = 1) {
    if (this.deckID === null || this.remaining === 0) {
      await this.getDeck(numberOfDecks);
    }
    let promise = await this._getCard(count);
    return promise;
  },
  _getCard(count) {
    let promise = new Promise((resolve, reject) => {
      fetch("https://deckofcardsapi.com/api/deck/" + this.deckID + "/draw/?count=" + count)
        .then((response) => response.json())
        .then((response) => {
          this.remaining = response.remaining;
          return response.cards;
        }).then((cards) => {
          resolve(cards);
        }).catch((e) => reject(e));
    });
    return promise
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
