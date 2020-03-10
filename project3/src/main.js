import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

data = {

}

new Vue({
  router,//http://deckofcardsapi.com/
  data,
  render: h => h(App)
}).$mount('#app')
