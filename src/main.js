import { createApp } from 'vue'
import { createStore } from 'vuex'
import VueToast from 'vue-toast-notification'
import App from './App.vue'
import 'vue-toast-notification/dist/theme-sugar.css'
import util from './util'
import { createRouter, createWebHashHistory } from 'vue-router'

// variables nativas globales
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.baseURL = process.env.VUE_APP_BACKEND + '/api'

// variables de estado globales vuex
const store = createStore({
  state () {
    return {
      usuario: null, // usuario logueado
      token: null,
      loadingCount: 0
    }
  },
  mutations: {
    setUsuario (state, usuario) {
      state.usuario = usuario
    },
    setToken (state, token) {
      state.token = token
    },
    logout (state) {
      state.usuario = null
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

// vue router
import Login from './components/Login.vue'
import Inicio from './components/Inicio.vue'
const routes = [
  { path: '/', component: App },
  { path: '/login', component: Login },
  { path: '/home', component: Inicio },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// aplicacion
const app = createApp(App)
app.use(router)
app.use(VueToast, { position: 'top' })
app.use(store)
app.use(util)
app.mount('#app')
