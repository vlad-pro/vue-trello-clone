import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/main.css'
import BaseButton from './components/BaseButton'

Vue.component('BaseButton', BaseButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
