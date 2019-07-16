import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import Navbar from 'muvc/navbar'
import VButton from 'muvc/button'
import Toast from 'muvc/toast/plugin'
import Modal from 'muvc/modal/plugin'
import transferDom from 'muvc/directives/transferDom'
import 'muvc/utils/rAF'

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
