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
window.arraySort = require('array-sort')

// variables de estado globales vuex
const store = createStore({
  state () {
    return {
      usuario: null, // usuario logueado
      token: null,
      isAuthenticated: false,
      loadingCount: 0
    }
  },
  mutations: {
    login(state, [usuario, token]) {
      state.usuario = usuario
      state.token = token
      state.isAuthenticated = true
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    },
    logout (state) {
      state.usuario = null
      state.token = null
      state.isAuthenticated = false
      axios.defaults.headers.common['Authorization'] = null
    },
    iniLoading (state) {
      state.loadingCount++
    },
    finLoading (state) {
      state.loadingCount--
      state.loadingCount = Math.max(0, state.loadingCount) // medida de seguridad
    },
    resetLoading (state) {
      state.loadingCount = 0
    }
  }
})

// vue router
import Login from './components/Login.vue'
import Registro from './components/Registro.vue'
import Inicio from './components/Inicio.vue'
import Admin from './components/Admin.vue'
import HorarioIndex from './components/HorarioIndex.vue'
import HorarioInstance from './components/HorarioInstance.vue'
import RecursoIndex from './components/RecursoIndex.vue'
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Inicio', component: Inicio },
  { path: '/login', name: 'Login', component: Login, meta: { noLogin: true } },
  { path: '/registro', name: 'Registro', component: Registro, meta: { noLogin: true } },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/horarios', name: 'Horarios', component: HorarioIndex },
  { path: '/horarios/:id', name: 'Horario', component: HorarioInstance },
  { path: '/recursos', name: 'Recursos', component: RecursoIndex },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to , from, next) => {
  console.log('router.beforeEach', to)
  store.commit('resetLoading') // medida de seguridad
  if (!store.state.isAuthenticated && !to.meta.noLogin) {
    next('/login')
  } else if (store.state.isAuthenticated && to.meta.noLogin) {
    next('/home')
  } else {
    next()
  }
})

// aplicacion
const app = createApp(App)
app.use(router)
app.use(VueToast, { position: 'top' })
app.use(store)
app.use(util)
app.mount('#app')
