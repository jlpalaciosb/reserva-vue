<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1 class="mt-3 mb-3">
      Recurso
    </h1>
    <div class="row form-group">
      <div class="col-12 col-lg-4">
        <label for="nombre">
          Nombre <span class="text-danger">*</span>
        </label>
        <input type="text" v-model.trim="recurso.nombre"
        class="form-control" id="nombre"
        :class="{ 'is-invalid': errors.nombre.length }">
        <div v-for="(error, index) in errors.nombre" :key="index"
        class="invalid-feedback">
          {{ error }}
        </div>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-12 col-lg-4">
        <label for="estado">
          Estado
        </label>
        <select id="estado" v-model="recurso.activo" class="form-control">
          <option :value="true">Activo</option>
          <option :value="false">Inactivo</option>
        </select>
      </div>
    </div>
    <div>
      <button class="btn btn-primary mr-3" @click="guardar()">
        <i class="fas fa-save"></i> Guardar
      </button>
      <button class="btn btn-ligth" @click="$router.push('/recursos')">
        <i class="fas fa-arrow-left"></i> Volver al listado
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecursoInstance',
  components: {
  },
  props: {
  },
  data() {
    return {
      recurso: { // the recurso instance (nuevo o existente)
        id: null, nombre: '', activo: true,
      },
      errors: {
        nombre: [],
      },
    }
  },
  computed: {
    nombre() {
      return this.recurso.nombre;
    },
  },
  created() {
    let id = this.$route.params.id;
    if (id && id != 'new') {
      this.getRecurso(id);
    } else {
      console.log('new recurso');
    }
  },
  mounted() {
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getRecurso(id) {
      this.$store.commit('iniLoading')
      axios.get('/recursos/' + id)
        .then(response => {
          this.$store.commit('finLoading')
          this.recurso = response.data;
        });
    },
    guardar() {
      if (this.recurso.id == null) {
        this.postRecurso();
      } else {
        this.putRecurso();
      }
    },
    postRecurso() {
      this.$store.commit('iniLoading')
      axios.post('/recursos/', this.recurso)
        .then(response => {
          this.recurso.id = response.data.id;
          this.$toast.success('Nuevo recurso guardado!')
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
    putRecurso() {
      this.$store.commit('iniLoading')
      axios.put('/recursos/' + this.recurso.id, this.recurso)
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
