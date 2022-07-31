<template>
  <div class="container">
    <div class="">
      <div class="d-flex justify-content-center mb-2">
        <img src="/images/logo-white.png" alt="" height="32">
      </div>
      <div class="card bg-dark text-white">
        <div class="card-header">
          Iniciar sesión
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
              @keypress.enter="login()" type="password"
              class="form-control" id="input-password">
              <div v-for="(error, index) in errors.password" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
              <div class="custom-control custom-checkbox mt-2">
                <input type="checkbox" class="custom-control-input" id="remember-check"
                v-model="remember">  
                <label class="custom-control-label" for="remember-check">
                  Recordarme
                </label>  
              </div> 
            </div>
            
            <div class="form-group">
              <button @click="login()" class="btn btn-primary w-100 mb-2">
                <i class="fas fa-sign-in-alt"></i> Ingresar
              </button>
              <a :href="$store.state.backend + '/forgot-password'"
              class="d-block text-right text-secondary">
                Olvidó su contraseña?
              </a>
            </div>

            <hr>
            
            <div class="d-flex justify-content-end">
              <router-link to="/registro" class="btn btn-secondary">
                <i class="fas fa-user-plus"></i> Nuevo usuario
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      remember: false,
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
  .custom-control-label:before{
    background-color: var(--secondary);
  }
  .container {
    max-width: 400px;
  }
</style>
