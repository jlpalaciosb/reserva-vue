<template>
  <div v-if="$store.state.usuario?.is_admin">
    <h1 class="mt-3 mb-3">
      Horarios
    </h1>
    <div class="row align-items-end">
      <div class="form-group col-6 col-lg-3">
        <label for="filtro-hora-desde">Filtro Hora Desde</label>
        <input id="filtro-hora-desde" v-model="filtros.horaDesde"
        type="time" class="form-control">
      </div>
      <div class="form-group col-6 col-lg-3">
        <label for="filtro-hora-hasta">Filtro Hora Hasta</label>
        <input id="filtro-hora-hasta" v-model="filtros.horaHasta"
        type="time" class="form-control">
      </div>
      <div class="form-group col-12 col-lg-6">
        <button class="btn btn-primary mr-3" @click="getHorarios(1)">
          <i class="fas fa-list"></i> Listar
        </button>
        <router-link to="/horarios/new" class="btn btn-success">
          <i class="fas fa-plus"></i> Nuevo
        </router-link>
      </div>
    </div>
    <div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th style="width:0"></th> <!-- width 0 minimiza el ancho en bootstrap table-responsive -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="horario in horarios.data" :key="horario.id">
              <td>{{ horario.nombre }}</td>
              <td>{{ horario.hora_ini }}</td>
              <td>{{ horario.hora_fin }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <router-link :to="`/horarios/${horario.id}`"
                  class="btn btn-success mr-3">
                    <i class="fas fa-edit"></i>
                    <span class="d-none d-lg-inline ml-1">Editar</span>
                  </router-link>
                  <button @click="eliminar(horario)"
                  class="btn btn-danger mr-3_">
                    <i class="fas fa-trash"></i>
                    <span class="d-none d-lg-inline ml-1">Eliminar</span>
                  </button>
                </div>
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
    },
    eliminar(horario) {
      if (!window.confirm('Por favor confirme!')) {
        return false;
      }
      this.$store.commit('iniLoading')
      axios.delete('/horarios/' + horario.id)
        .then(response => {
          console.log(response)
          this.$toast.success('Horario eliminado!')
          this.getHorarios(); // refresh listado
        })
        .catch((error) => {
          let res = error?.response?.data
          this.$toast.error(res?.message || 'Algo salió mal')
        })
        .finally(() => {
          this.$store.commit('finLoading')
        })
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
