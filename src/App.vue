<template>
  <Login v-if="$store.state.token == null || $store.state.usuario == null" />
  <Layout v-else />
  <Loading v-model:active="isLoading" :is-full-page="true"/>
</template>

<script>
import Login from './components/Login.vue'
import Layout from './components/Layout.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

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

<!-- Don't add "scoped" attribute to apply CSS to all components -->
<style>
  .v-toast {
    z-index: 999999 !important;
  }
</style>
