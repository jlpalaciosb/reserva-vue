<template>
  <NavBar v-if="$store.state.isAuthenticated" />
  <div class="container mb-5">
    <RouterView />
  </div>
  <Loading v-if="isLoading" :active="true" :is-full-page="true"
  color="#fff" backgroundColor="#000" :lockScroll="true" />
  <Background />
</template>

<script>
import NavBar from './components/NavBar.vue'
import Background from './components/Background.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'App',
  components: {
    NavBar,
    Background,
    Loading,
  },
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loadingCount > 0
    },
    title() {
      return this.$route.name
    }
  },
  methods: {
    setDocumentTitle() {
      document.title = 'ReservasYa - ' + this.title
    }
  },
  created() {
    this.setDocumentTitle()
    console.log('app creada')

    this.$router.afterEach(() => {
      // cerrar navbar al navegar para q no se quede abierto
      jQuery('.navbar-collapse').collapse('hide')
    })
  },
  mounted() {
    console.log('app montada')
  },
  watch: {
    title() {
      this.setDocumentTitle()
    },
    isLoading() {
      // al mostrarse el loading desenfocar inputs y botones para
      // evitar doble click
      if (this.isLoading) {
        document.activeElement.blur()
      }
    }
  }
}
</script>

<!-- Don't add "scoped" attribute to apply CSS to all components -->
<style>

  /* estilo toast */
  .v-toast {
    z-index: 999999 !important;
  }

  /* estilo pagination */
  .pagination-page-nav:not(.active) .page-link {
    background-color: var(--dark) !important;
    color: white;
    border-color: rgba(0, 0, 0, 0.1);
  }
  .pagination-prev-nav .page-link, .pagination-next-nav .page-link {
    background-color: var(--dark) !important;
    color: white;
    border-color: rgba(0, 0, 0, 0.1);
  }

</style>
