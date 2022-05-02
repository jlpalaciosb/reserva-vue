<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1>Programar horarios y recursos</h1>
    <div class="form-group">
      <label for="input-fecha">Fecha</label>
      <input v-model="fecha" @change="getHorariosRecursos()"
      type="date" class="form-control" id="input-fecha">
    </div>
    <div v-if="horarios.length
    && recursos.length
    && horariosRecursos.length == (horarios.length * recursos.length)">
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
                  v-model="findHorarioRecurso(hor.id, rec.id).limite"
                  class="form-control">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-primary" @click="guardar()">
        Guardar
      </button>
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
      horariosRecursos: [],
      horarios: [],
      recursos: [],
    }
  },
  computed: {
  },
  created() {
    this.getHorarios()
    this.getRecursos()
    this.getHorariosRecursos()
  },
  methods: {
    getHorarios() {
      this.$store.commit('iniLoading')
      axios.get('/horarios')
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.horarios = res
            this.fillHorariosRecursos()
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
            this.fillHorariosRecursos()
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
    getHorariosRecursos() {
      this.$store.commit('iniLoading')
      axios.get(`/horariosRecursos?fecha=${this.fecha}`)
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.horariosRecursos = res
            this.fillHorariosRecursos()
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
    findHorarioRecurso(idHorario, idRecurso) {
      return this.horariosRecursos
        .filter(hr =>
          hr.id_horario == idHorario &&
          hr.id_recurso == idRecurso)[0]
        || null;
    },
    guardar() {
      this.$store.commit('iniLoading')
      axios.post('/horariosRecursos', this.horariosRecursos)
        .then((response) => {
          let res = response.data
          if (res.ok) {
            this.$toast.success('Programado')
            this.getHorariosRecursos()
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
    fillHorariosRecursos() {
      this.horarios.forEach(hor => {
        this.recursos.forEach(rec => {
          let hr = this.findHorarioRecurso(hor.id, rec.id)
          if (hr == null) {
            this.horariosRecursos.push({
              fecha: this.fecha,
              id_horario: hor.id,
              id_recurso: rec.id,
              limite: 0,
            })
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
