<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1 class="mt-3 mb-3">
      Administración de reservables
    </h1>
    <div class="row">
      <div class="col-12 col-lg-4 form-group">
        <label for="input-fecha">
          Fecha de Programación <span class="text-danger">*</span>
        </label>
        <input v-model="fecha" :class="{ 'is-invalid': !fecha }"
        type="date" class="form-control" id="input-fecha">
        <div class="invalid-feedback">
          Ingrese una fecha 
        </div>
      </div>
      <div class="col-12 col-lg-8 form-group">
        <label>Autocompletar</label>
        <div>
          <button class="btn btn-primary" title="Igual que ayer"
          :disabled="!fecha" @click="getHorariosRecursos(-1)">
            <i class="fas fa-calendar"></i> -1 día
          </button>
          <button class="btn btn-primary ml-3" title="Igual que la semana pasada"
          :disabled="!fecha" @click="getHorariosRecursos(-7)">
            <i class="fas fa-calendar"></i> -7 días
          </button>
        </div>
      </div>
    </div>
    <div v-if="fecha
    && horarios.length
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
      axios.get('/horarios?sub_index=all_activos')
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
      axios.get('/recursos?sub_index=all_activos')
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
    getHorariosRecursos(offset = 0) {
      this.$store.commit('iniLoading')
      axios.get(`/horariosRecursos?fecha=${this.fecha}&offset=${offset}`)
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.horariosRecursos = res
            if (offset) {
              this.horariosRecursos.forEach(hr => {
                hr.fecha = this.fecha; // fix fecha
              })
            }
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
            this.$toast.success('Programación de recursos guardada')
            this.getHorariosRecursos() // refresh set id modelo HorarioRecurso
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
            // fill new HorarioRecurso
            this.horariosRecursos.push({
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
        this.getHorariosRecursos()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
