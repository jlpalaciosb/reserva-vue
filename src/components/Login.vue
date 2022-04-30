<template>
  <div class="container">
    <div class="row">
      <div class="col-0 col-sm-2 col-lg-4"></div>
      <div class="col-12 col-sm-8 col-lg-4">
        <div class="card">
          <div class="card-header">
            Inicie Sesión
          </div>
          <div class="card-body">
            <div>
              <div class="form-group">
                <label for="input-username">Usuario</label>
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
              </div>
              <button @click="login()" class="btn btn-primary">Ingresar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-0 col-sm-2 col-lg-4"></div>
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
      errors: {
        username: [],
        password: []
      }
    }
  },
  mounted() {
    console.log('login')
  },
  methods: {
    login() {
      let creds = {
        username: this.username,
        password: this.password,
        token_name: 'asdf'
      }
      this.$store.commit('iniLoading')
      axios.post('/tokens/create', creds) 
        .then(response => {
          let res = response.data
          if (res.usuario && res.token) {
            this.$store.commit('setToken', res.token)
            this.$store.commit('setUsuario', res.usuario)
            this.$toast.success('Bienvenido ' + res.usuario.nombre)
          } else {
            this.$toast.error('Algo salió mal')
          }
        })
        .catch(error => {
          if (error?.response?.data?.message) {
            let res = error.response.data
            this.$toast.error(res.message)
            if (res.errors) {
              this.errors = { ...this.errors, ...res.errors };
            }
          } else {
            this.$toast.error('Algo salió mal')
          }
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
  .card {
    margin-top: 60px;
  }
</style>
