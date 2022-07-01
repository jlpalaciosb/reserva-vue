<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Reservas</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <li class="nav-item"
        :class="{ 'active': $route.path == '/admin' }">
          <router-link v-if="$store.state.usuario?.is_admin" class="nav-link" to="/admin">
            Administración
          </router-link>
        </li>
        <li class="nav-item"
        :class="{ 'active': $route.path == '/horarios' }">
          <router-link v-if="$store.state.usuario?.is_admin" class="nav-link" to="/horarios">
            Horarios
          </router-link>
        </li>
        <li class="nav-item"
        :class="{ 'active': $route.path == '/recursos' }">
          <router-link v-if="$store.state.usuario?.is_admin" class="nav-link" to="/recursos">
            Recursos
          </router-link>
        </li>

        <!-- boton en vez de dropdown -->
        <li class="d-lg-none nav-item">
          <a href="#" class="nav-link" @click="logout()">Logout</a>
        </li>

        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li> -->
      </ul>

      <!-- margen -->
      <div class="ml-5"></div>

      <div class="form-inline my-2 my-lg-0">
        <!-- por ahora el dropdown muestra solo en escritorio -->
        <div class="dropdown d-none d-lg-block">
          <div class="cpointer dropdown-toggle- bg-dark" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          style="width: 32px; height: 32px; border-radius: 50%;">
            <span class="d-block text-center text-white"
            style="line-height: 32px;">
              {{ iniciales }}
            </span>
          </div>

          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <div class="dropdown-header">
              {{ nombreCompleto }}
            </div>
            <!-- <div class="dropdown-divider"></div> -->
            <button class="dropdown-item cpointer" type="button" @click="logout()">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
            <!-- <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a> -->
          </div>
        </div>
        <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search"> -->
        <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    // msg: String
  },
  computed: {
    // iniciales del usuario
    iniciales() {
      let nombre = this.$store.state.usuario.nombre
      let apellido = this.$store.state.usuario.apellido
      return (nombre.charAt(0) + apellido.charAt(0)).toLocaleUpperCase()
    },
    // nombre completo del usuario
    nombreCompleto() {
      let nombre = this.$store.state.usuario.nombre
      let apellido = this.$store.state.usuario.apellido
      return nombre + ' ' + apellido
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
