<template>
  <h1 class="mt-3 mb-3">
    Reservar {{ $store.state.nomReservable11 }}
  </h1>
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
            <div class="card">
              <div v-if="horarioRecurso != null && horarioRecurso.limite > 0"
              class="card-body">
                <p>
                  Reservado {{ horarioRecurso.reservas.length }} de
                  {{ horarioRecurso.limite }}
                </p>
                <div class="d-flex justify-content-end">
                  <button @click="reservar(hor.id, rec.id)" class="btn btn-primary">
                    <i class="fas fa-calendar-check"></i> Reservar
                  </button>
                </div>
              </div>
              <div v-else class="card-body">
                <p>
                  No disponible
                </p>
                <div class="invisible"> <!-- para igualar la altura del card -->
                  <button class="btn btn-primary">asdf</button>
                </div>
              </div>
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
      return arraySort(horarios, ['hora_ini', 'hora_fin'])
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
      return arraySort(recursos, ['nombre'])
    }
  },
  created() {
    this.getListaHorarioRecurso()
  },
  methods: {
    getListaHorarioRecurso() {
      this.$store.commit('iniLoading')
      axios.get('/horarioRecursos')
        .then((response) => {
          let res = response.data
          if (res.length >= 0) { // si es un array
            this.listaHorarioRecurso = res.filter(hr => hr.limite > 0)
            if (this.listaHorarioRecurso.length == 0) {
              if (this.$store.state.usuario.is_admin) {
                this.$toast.warning('Ingrese en administración para habilitar los recursos disponibles', {
                  duration: 5000
                })
              } else {
                this.$toast.warning('Ningún recurso disponible para reservar', {
                  duration: 5000
                })
              }
            }
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
          this.getListaHorarioRecurso()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
