<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1>Recursos</h1>
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
              <td></td>
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
      axios.get('/recursos?page=' + page)
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
