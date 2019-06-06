import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import Navbar from 'vue-components/navbar'
import VButton from 'vue-components/button'
import Toast from 'vue-components/toast/plugin'
import Modal from 'vue-components/modal/plugin'
import AnimatedRoute from 'vue-components/animatedRoute'
import transferDom from 'vue-components/directives/transferDom'
import 'vue-components/utils/rAF'

Vue.component('Navbar', Navbar)
Vue.component('VButton', VButton)
Vue.use(Toast)
Vue.use(Modal)
Vue.use(AnimatedRoute)
Vue.directive('transfer-dom', transferDom)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
