import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import Navbar from '@/components/navbar'
import VButton from '@/components/button'
import Toast from '@/components/toast/plugin'
import Modal from '@/components/modal/plugin'
import transferDom from '@/directives/transferDom/index'

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
