<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1 class="mt-3 mb-3 text-white">
      Horario
    </h1>
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <div class="form-group">
              <label for="nombre">
                Nombre <span class="text-danger">*</span>
              </label>
              <input type="text" v-model.trim="horario.nombre"
              class="form-control" id="nombre"
              :class="{ 'is-invalid': errors.nombre.length }">
              <div v-for="(error, index) in errors.nombre" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div class="form-group">
              <label for="hora_ini">
                Hora Inicio <span class="text-danger">*</span>
              </label>
              <input type="time" v-model="horario.hora_ini"
              class="form-control" id="hora_ini"
              :class="{ 'is-invalid': errors.hora_ini.length }">
              <div v-for="(error, index) in errors.hora_ini" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div class="form-group">
              <label for="hora_fin">
                Hora Fin <span class="text-danger">*</span>
              </label>
              <input type="time" v-model="horario.hora_fin"
              class="form-control" id="hora_fin"
              :class="{ 'is-invalid': errors.hora_fin.length }">
              <div v-for="(error, index) in errors.hora_fin" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div>
              <button class="btn btn-primary mr-3" @click="guardar()">
                <i class="fas fa-save"></i> Guardar
              </button>
              <button class="btn btn-secondary" @click="$router.push('/horarios')">
                <i class="fas fa-arrow-left"></i> Volver al listado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorarioInstance',
  components: {
  },
  props: {
  },
  data() {
    return {
      horario: { // the horario instance (nuevo o existente)
        id: null, nombre: '', hora_ini: '', hora_fin: '',
      },
      errors: {
        nombre: [], hora_ini: [], hora_fin: [],
      },
    }
  },
  computed: {
    nombre() {
      return this.horario.nombre;
    },
    hora_ini() {
      return this.horario.hora_ini;
    },
    hora_fin() {
      return this.horario.hora_fin;
    },
  },
  created() {
    let id = this.$route.params.id;
    if (id && id != 'new') {
      this.getHorario(id);
    } else {
      console.log('new horario');
    }
  },
  mounted() {
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getHorario(id) {
      this.$store.commit('iniLoading')
      axios.get('/horarios/' + id)
        .then(response => {
          this.$store.commit('finLoading')
          this.horario = response.data;
        });
    },
    guardar() {
      if (this.horario.id == null) {
        this.postHorario();
      } else {
        this.putHorario();
      }
    },
    postHorario() {
      this.$store.commit('iniLoading')
      axios.post('/horarios', this.horario)
        .then(response => {
          this.horario.id = response.data.id;
          this.$toast.success('Nuevo horario guardado!')
        })
        .catch((error) => {
          let res = error?.response?.data
          this.errors = { ...this.errors, ...(res?.errors || {}) }
          this.$toast.error(res?.message || 'Algo salió mal')
        })
        .finally(() => {
          this.$store.commit('finLoading')
        })
    },
    putHorario() {
      this.$store.commit('iniLoading')
      axios.put('/horarios/' + this.horario.id, this.horario)
        .then(response => {
          console.log(response);
          this.$toast.success('Cambios guardados!')
        })
        .catch((error) => {
          let res = error?.response?.data
          this.errors = { ...this.errors, ...(res?.errors || {}) }
          this.$toast.error(res?.message || 'Algo salió mal')
        })
        .finally(() => {
          this.$store.commit('finLoading')
        })
    },
  },
  watch: {
    nombre: function () {
      this.errors.nombre = [];
    },
    hora_ini: function () {
      this.errors.hora_ini = [];
    },
    hora_fin: function () {
      this.errors.hora_fin = [];
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
