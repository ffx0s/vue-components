/* eslint-env node */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import page from './modules/page'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    page
  },
  strict: isDev,
  plugins: isDev ? [createLogger()] : []
})
