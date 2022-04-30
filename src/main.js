import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

// variables de estado globales
const store = createStore({
  state () {
    return {
      token: null,
      loadingCount: 0
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    logout (state) {
      state.token = null
    },
    iniLoading (state) {
      state.loadingCount++
    },
    finLoading (state) {
      state.loadingCount--
    },
    resetLoading (state) {
      state.loadingCount = 0
    }
  }
})

// variables nativas globales
window.$ = window.jQuery = require('jquery')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.baseURL = process.env.VUE_APP_BACKEND + '/api'

// aplicacion
const app = createApp(App)
app.use(store)
app.mount('#app')
