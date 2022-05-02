<template>
  <div v-if="$store.state.usuario.is_admin">
    <h1>Programar horarios y recursos</h1>
    <div class="form-group">
      <label for="input-fecha">Fecha</label>
      <input v-model="fecha" @change="getListaHorarioRecurso()"
      type="date" class="form-control" id="input-fecha">
    </div>
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
            <td v-for="rec, index in recursos" :key="index">
              <div>
                <input type="number" min="0"
                :value="getHorarioRecurso(hor.id, rec.id)?.limite || 0"
                @keypress.enter="programar(hor.id, rec.id, $event.target.value)"
                class="form-control">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  props: {
    // msg: String
  },
  data() {
    return {
      fecha: '',
      listaHorarioRecurso: [],
      horarios: [],
      recursos: [],
    }
  },
  computed: {
  },
  created() {
    this.getHorarios()
    this.getRecursos()
    this.getListaHorarioRecurso()
  },
  methods: {
    getHorarios() {
      this.$store.commit('iniLoading')
      axios.get('/horarios')
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.horarios = res
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
    getRecursos() {
      this.$store.commit('iniLoading')
      axios.get('/recursos')
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.recursos = res
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
    getListaHorarioRecurso() {
      this.$store.commit('iniLoading')
      axios.get(`/horariosRecursos?fecha=${this.fecha}`)
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
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
    programar(idHorario, idRecurso, limite) {
      let body = {
        id: this.getHorarioRecurso(idHorario, idRecurso)?.id || null,
        fecha: this.fecha,
        id_horario: idHorario,
        id_recurso: idRecurso,
        limite: limite,
      }
      this.$store.commit('iniLoading')
      axios.post('/horariosRecursos', body)
        .then((response) => {
          let res = response.data
          if (res.id) {
            this.$toast.success('Programado')
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
