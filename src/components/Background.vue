<template>
  <img src="../assets/header-bg.svg" id="bg" alt="">
</template>

<script>
export default {
  name: 'BackgroundImage',
  props: {
    // msg: String
  },
  computed: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #bg {
    position: fixed; 
    top: 0; 
    left: 0;
    
    /* Preserve aspet ratio */
    min-width: 100%;
    min-height: 100%;

    z-index: -1;
  }
</style>
