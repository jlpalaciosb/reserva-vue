<template>
  <Login v-if="$store.state.token == null || $store.state.usuario == null" />
  <Layout v-else />
  <Loading v-model:active="isLoading" :is-full-page="true"/>
</template>

<script>
import Login from './components/Login.vue'
import Layout from './components/Layout.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    Login,
    Layout,
    Loading
  },
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loadingCount > 0
    }
  },
  mounted() {
    console.log('app montada')
  }
}
</script>

<style>
  /* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */
</style>
