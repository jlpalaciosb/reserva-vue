<template>
  <NavBar v-if="isLoggedIn" />
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
    },
    isLoggedIn() {
      return this.$store.state.token != null && this.$store.state.usuario != null
    }
  },
  created() {
    console.log('app creada')
    if (this.isLoggedIn) {
      this.$router.push('/home')
    } else {
      this.$router.push('/login')
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
