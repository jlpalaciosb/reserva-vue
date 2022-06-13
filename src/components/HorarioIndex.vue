<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1>Horarios</h1>
    <div class="row align-items-end">
      <div class="form-group col-6 col-lg-3">
        <label for="filtro-hora-desde">Hora Desde:</label>
        <input id="filtro-hora-desde" v-model="filtros.horaDesde"
        type="time" class="form-control">
      </div>
      <div class="form-group col-6 col-lg-3">
        <label for="filtro-hora-hasta">Hora Hasta:</label>
        <input id="filtro-hora-hasta" v-model="filtros.horaHasta"
        type="time" class="form-control">
      </div>
      <div class="form-group col-12 col-lg-6">
        <button class="btn btn-primary mr-3" @click="getHorarios(1)">Filtrar</button>
        <router-link to="/horarios/new" class="btn btn-success">
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
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="horario in horarios.data" :key="horario.id">
              <td>{{ horario.nombre }}</td>
              <td>{{ horario.hora_ini }}</td>
              <td>{{ horario.hora_fin }}</td>
              <td>
                <router-link :to="`/horarios/${horario.id}`">
                  Editar
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-end">
        <Pagination :data="horarios" @pagination-change-page="getHorarios" />
      </div>
    </div>
  </div>
</template>

<script>
import LaravelVuePagination from 'laravel-vue-pagination';

export default {
  name: 'HorarioIndex',
  components: {
    Pagination: LaravelVuePagination,
  },
  props: {
  },
  data() {
    return {
      filtros: { horaDesde: '', horaHasta: '' },
      horarios: {}, // Our data object that holds the LARAVEL PAGINATED data
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.getHorarios();
  },
  methods: {
    // Our method to GET results from a Laravel endpoint
    getHorarios(page = 1) {
      this.$store.commit('iniLoading')
      let params = new URLSearchParams();
      params.set('page', page);
      params.set('horaDesde', this.filtros.horaDesde);
      params.set('horaHasta', this.filtros.horaHasta);
      axios.get('/horarios?' + params.toString())
        .then(response => {
          this.$store.commit('finLoading')
          this.horarios = response.data;
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
