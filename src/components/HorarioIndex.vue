<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1>Horarios</h1>
    
  </div>
</template>

<script>
export default {
  name: 'HorarioIndex',
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
