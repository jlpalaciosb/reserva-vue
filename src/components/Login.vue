<template>
  <div class="row">
    <div class="col-0 col-sm-2 col-lg-4"></div>
    <div class="col-12 col-sm-8 col-lg-4">
      <div class="d-flex justify-content-center mb-2">
        <img src="/images/logo-color.png" alt="" height="32">
      </div>
      <div class="card">
        <div class="card-header">
          Iniciar Sesión
        </div>
        <div class="card-body">
          <div>
            <div class="form-group">
              <label for="input-username">Usuario o email</label>
              <input v-model.trim="username" :class="{ 'is-invalid': errors.username.length }"
              @keypress.enter="login()" type="text" class="form-control" id="input-username">
              <div v-for="(error, index) in errors.username" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div class="form-group">
              <label for="input-password">Contraseña</label>
              <input v-model="password" :class="{ 'is-invalid': errors.password.length }"
              @keypress.enter="login()" type="password" class="form-control" id="input-password">
              <div v-for="(error, index) in errors.password" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
              <a :href="$store.state.backend + '/forgot-password'"
              class="d-block text-right text-warning">
                Olvidó su contraseña?
              </a>
            </div>
            
            <div class="d-flex justify-content-center form-group">
              <button @click="login()" class="btn btn-primary"
              style="width: 80%">
                <i class="fas fa-sign-in-alt"></i> Ingresar
              </button>
            </div>
            
            <div class="d-flex justify-content-end">
              <router-link to="/registro" class="btn btn-light">
                <i class="fas fa-user-plus"></i> Nuevo usuario
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-0 col-sm-2 col-lg-4"></div>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  props: {
    // msg: String
  },
  data() {
    return {
      username: null,
      password: null,
      errors: {
        username: [],
        password: []
      }
    }
  },
  methods: {
    login() {
      let creds = {
        username: this.username,
        password: this.password,
        device: 'asdf'
      }
      this.$store.commit('iniLoading')
      axios.post('/login', creds)
        .then((response) => {
          let res = response.data
          if (res.usuario && res.token) {
            this.$store.commit('login', [res.usuario, res.token])
            this.$toast.success('Bienvenido ' + res.usuario.nombre + '.')
            this.$router.push('/')
          } else {
            this.$toast.error('Algo salió mal')
          }
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
    username: function () {
      this.errors.username = []
    },
    password: function () {
      this.errors.password = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    margin-top: 60px;
  }
  button {
    width: 8rem;
  }
</style>
