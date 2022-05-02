<template>
  <NavBar v-if="$store.state.isAuthenticated" />
  <div class="container">
    <RouterView />
  </div>
  <Loading v-if="isLoading" :active="true" :is-full-page="true"/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: {
    NavBar,
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
  created() {
    console.log('app creada')
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
