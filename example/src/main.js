import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import Navbar from 'lvan/navbar'
import VButton from 'lvan/button'
import Toast from 'lvan/toast/plugin'
import Modal from 'lvan/modal/plugin'
import transferDom from 'lvan/directives/transferDom'
import 'lvan/utils/rAF'

Vue.component('Navbar', Navbar)
Vue.component('VButton', VButton)
Vue.use(Toast)
Vue.use(Modal)
Vue.directive('transfer-dom', transferDom)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
