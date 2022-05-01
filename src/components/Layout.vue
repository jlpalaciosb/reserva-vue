<template>
  <NavBar />
  
  <!-- content, TODO usar vue-router -->
  <div class="container">
    <Inicio />
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import Inicio from './Inicio.vue'

export default {
  name: 'LayoutPage',
  components: {
    NavBar,
    Inicio
  },
  props: {
    // msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
