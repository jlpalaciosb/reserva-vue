<template>
  <div>
    <p>hola mundo</p>
    <p>hola mundo</p>
    <p>hola mundo</p>
    <p>hola mundo</p>
  </div>
</template>

<script>
export default {
  name: 'InicioPage',
  props: {
    // msg: String
  },
  data() {
    return {
      listaHorarioRecurso: [], // para reservar
    }
  },
  created() {
    this.getListaHorarioRecurso()
  },
  methods: {
    getListaHorarioRecurso() {
      this.$store.commit('iniLoading')
      axios.get('/horariosRecursos')
        .then((response) => {
          let res = response.data
          if (res.length) { // si es un array
            this.listaHorarioRecurso = res
          } else {
            this.$toast.error('Algo salió mal')
          }
        })
        .catch((error) => {
          let res = error?.response?.data
          this.$toast.error(res?.message || 'Algo salió mal')
        })
        .finally(() => {
          this.$store.commit('finLoading')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
