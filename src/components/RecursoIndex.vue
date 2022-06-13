<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1>Recursos</h1>
    <div class="row align-items-end">
      <div class="form-group col-6 col-lg-3">
        <label for="filtro-nombre">Filtro Nombre:</label>
        <input id="filtro-nombre" v-model="filtros.nombre"
        type="text" class="form-control">
      </div>
      <div class="form-group col-12 col-lg-6">
        <button class="btn btn-primary mr-3" @click="getRecursos(1)">Listar</button>
        <router-link to="/recursos/new" class="btn btn-success">
          Nuevo
        </router-link>
      </div>
    </div>
    <div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recurso in recursos.data" :key="recurso.id">
              <td>{{ recurso.nombre }}</td>
              <td>{{ recurso.activo ? 'Sí' : 'No' }}</td>
              <td>
                <router-link :to="`/recursos/${recurso.id}`">
                  Editar
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-end">
        <Pagination :data="recursos" @pagination-change-page="getRecursos" />
      </div>
    </div>
  </div>
</template>

<script>
import LaravelVuePagination from 'laravel-vue-pagination';

export default {
  name: 'RecursoIndex',
  components: {
    Pagination: LaravelVuePagination,
  },
  props: {
  },
  data() {
    return {
      filtros: { nombre: '' },
      recursos: {}, // Our data object that holds the Laravel paginator data
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.getRecursos();
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getRecursos(page = 1) {
      this.$store.commit('iniLoading')
      let params = new URLSearchParams();
      params.set('page', page);
      params.set('nombre', this.filtros.nombre);
      axios.get('/recursos?' + params.toString())
        .then(response => {
          this.$store.commit('finLoading')
          this.recursos = response.data;
        });
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
