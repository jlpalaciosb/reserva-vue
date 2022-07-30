<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1 class="mt-3 mb-3 text-white">
      Administración de reservables
    </h1>
    <div class="card bg-dark text-white mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-lg-4">
            <label for="input-fecha">
              Fecha de Programación <span class="text-danger">*</span>
            </label>
            <input v-model="fecha" :class="{ 'is-invalid': !fecha }"
            type="date" class="form-control" id="input-fecha">
            <div class="invalid-feedback">
              Ingrese una fecha 
            </div>
          </div>
          <div class="col-12 col-lg-8">
            <label>Autocompletar</label>
            <div>
              <button class="btn btn-primary" title="Igual que ayer"
              :disabled="!fecha" @click="getHorarioRecursos(-1)">
                <i class="fas fa-calendar"></i> -1 día
              </button>
              <button class="btn btn-primary ml-3" title="Igual que la semana pasada"
              :disabled="!fecha" @click="getHorarioRecursos(-7)">
                <i class="fas fa-calendar"></i> -7 días
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="fecha
    && horarios.length
    && recursos.length
    && horarioRecursos.length == (horarios.length * recursos.length)">
      <div class="table-responsive">
        <table class="table table-dark">
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
        <i class="fas fa-save"></i> Guardar
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
      fecha: this.$util.localHoyISO(),
      horarioRecursos: [],
      horarios: [],
      recursos: [],
    }
  },
  computed: {
  },
  created() {
    this.getHorarios()
    this.getRecursos()
    this.getHorarioRecursos()
  },
  methods: {
    getHorarios() {
      this.$store.commit('iniLoading')
      axios.get('/horarios?activo=1&per_page=1000') // long per page to fetch all
        .then((response) => {
          let res = response.data.data
          if (res.length >= 0) { // si es un array
            this.horarios = res
            this.fillHorarioRecursos()
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
      axios.get('/recursos?activo=1&per_page=1000') // long per page to fetch all
        .then((response) => {
          let res = response.data.data
          if (res.length >= 0) { // si es un array
            this.recursos = res
            this.fillHorarioRecursos()
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
    getHorarioRecursos(offset = 0) {
      this.$store.commit('iniLoading')
      axios.get(`/horarioRecursos?fecha=${this.fecha}&offset=${offset}`)
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.horarioRecursos = res
            if (offset) {
              this.horarioRecursos.forEach(hr => {
                hr.fecha = this.fecha; // fix fecha
              })
            }
            this.fillHorarioRecursos()
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
      return this.horarioRecursos
        .filter(hr =>
          hr.id_horario == idHorario &&
          hr.id_recurso == idRecurso)[0]
        || null;
    },
    guardar() {
      this.$store.commit('iniLoading')
      axios.post('/horarioRecursos', this.horarioRecursos)
        .then((response) => {
          let res = response.data
          if (res.ok) {
            this.$toast.success('Programación de recursos guardada')
            this.getHorarioRecursos() // refresh set id modelo HorarioRecurso
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
    fillHorarioRecursos() {
      this.horarios.forEach(hor => {
        this.recursos.forEach(rec => {
          let hr = this.findHorarioRecurso(hor.id, rec.id)
          if (hr == null) {
            // fill new HorarioRecurso
            this.horarioRecursos.push({
              id: null,
              fecha: this.fecha,
              id_horario: hor.id,
              id_recurso: rec.id,
              limite: 0,
            })
          }
        })
      })
    }
  },
  watch: {
    fecha: function() {
      if (this.fecha) {
        this.getHorarioRecursos()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
