<template>
  <h1>Reservar Lugares</h1>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Horarios</th>
          <th v-for="rec, index in recursos" :key="index">
            {{ rec.nombre }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hor, index in horarios" :key="index">
          <td>{{ $util.labelHorario(hor) }}</td>
          <td v-for="rec, index in recursos" :key="index"
          :set="horarioRecurso = getHorarioRecurso(hor.id, rec.id)">
            <div v-if="horarioRecurso != null">
              <div>
                <span>
                  Reservado: {{ horarioRecurso.reservas.length }} de
                  {{ horarioRecurso.limite }}
                </span>
              </div>
              <div class="">
                <button @click="reservar(hor.id, rec.id)" class="btn btn-primary">
                  Reservar
                </button>
              </div>
            </div>
            <div v-else>
              No disponible
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
  computed: {
    horarios() {
      let horarios = []
      this.listaHorarioRecurso
        .map(hr => hr.horario)
        .forEach(h0 => {
          if (horarios.filter(h1 => h0.id == h1.id).length == 0) {
            horarios.push(h0)
          }
        })
      return horarios
    },
    recursos() {
      let recursos = []
      this.listaHorarioRecurso
        .map(hr => hr.recurso)
        .forEach(r0 => {
          if (recursos.filter(r1 => r0.id == r1.id).length == 0) {
            recursos.push(r0)
          }
        })
      return recursos
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
    },
    getHorarioRecurso(idHorario, idRecurso) {
      return this.listaHorarioRecurso
        .filter(hr =>
          hr.horario.id == idHorario &&
          hr.recurso.id == idRecurso)[0]
        || null;
    },
    reservar(idHorario, idRecurso) {
      let horarioRecurso = this.getHorarioRecurso(idHorario, idRecurso)
      let body = {
        id_horario_recurso: horarioRecurso.id
      }
      this.$store.commit('iniLoading')
      axios.post('/reservas', body)
        .then((response) => {
          let res = response.data
          if (res.id) {
            this.$toast.success('Reservado')
            this.getListaHorarioRecurso()
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
