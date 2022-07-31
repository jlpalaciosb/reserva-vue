<template>
  <div class="container">
    <div class="">
      <div class="d-flex justify-content-center mb-2">
        <img src="/images/logo-white.png" id="imglogo" height="32">
      </div>
      <div class="card bg-dark text-white">
        <div class="card-header">
          REGISTRARME
        </div>
        <div class="card-body">
          <div>
            <!-- <div class="form-group">
              <label for="input-username">Usuario</label>
              <input v-model.trim="username" :class="{ 'is-invalid': errors.username.length }"
              @keypress.enter="login()" type="text" class="form-control" id="input-username">
              <div v-for="(error, index) in errors.username" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div> -->
            <div class="form-group">
              <label for="input-nombre-completo">Nombre y apellido</label>
              <input v-model.trim="nombre_completo" :class="{ 'is-invalid': errors.nombre_completo.length }"
              @keypress.enter="login()" type="text" class="form-control" id="input-nombre-completo">
              <div v-for="(error, index) in errors.nombre_completo" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <!-- <div class="form-group">
              <label for="input-apellido">Apellido</label>
              <input v-model.trim="apellido" :class="{ 'is-invalid': errors.apellido.length }"
              @keypress.enter="login()" type="text" class="form-control" id="input-apellido">
              <div v-for="(error, index) in errors.apellido" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div> -->
            <div class="form-group">
              <label for="input-email">Correo electrónico</label>
              <input v-model.trim="email" :class="{ 'is-invalid': errors.email.length }"
              @keypress.enter="login()" type="text" class="form-control" id="input-email">
              <div v-for="(error, index) in errors.email" :key="index"
              class="invalid-feedback">
                {{ error }}
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="input-password">Contraseña</label>
                  <input v-model="password" :class="{ 'is-invalid': errors.password.length }"
                  @keypress.enter="login()" type="password" class="form-control" id="input-password">
                  <div v-for="(error, index) in errors.password" :key="index"
                  class="invalid-feedback">
                    {{ error }}
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="input-password">Confirmar</label>
                  <input v-model="confirm" :class="{ 'is-invalid': errors.confirm.length }"
                  @keypress.enter="login()" type="password" class="form-control" id="input-confirm">
                  <div v-for="(error, index) in errors.confirm" :key="index"
                  class="invalid-feedback">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <button @click="register()" class="btn btn-primary w-100">
                REGISTRARME
              </button>
            </div>

            <HrText text="or" />

            <div class="d-flex justify-content-center mb-3">
              <img src="../assets/google.png" alt="google"
              class="img-social mr-3" @click="clickSocial()">
              <img src="../assets/facebook.png" alt="facebook"
              class="img-social mr-3" @click="clickSocial()">
              <img src="../assets/linkedin.png" alt="linkedin"
              class="img-social mr-3-" @click="clickSocial()">
            </div>
            
            <div class="text-center">
              <span class="mr-2">Ya tienes una cuenta?</span>
              <router-link to="/login" class="">
                INICIAR SESIÓN
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HrText from './HrText.vue';

export default {
  name: 'RegistroPage',
  props: {
    // msg: String
  },
  components: {
    HrText,
  },
  data() {
    return {
      nombre_completo: null,
      email: null,
      password: null,
      confirm: null,
      errors: {
        nombre_completo: [],
        email: [],
        password: [],
        confirm: [],
      }
    }
  },
  methods: {
    register() {
      let newUser = {
        nombre_completo: this.nombre_completo,
        email: this.email,
        password: this.password,
        confirm: this.confirm,
      }
      this.$store.commit('iniLoading')
      axios.post('/registro', newUser)
        .then((response) => {
          let res = response.data
          if (res.id) {
            this.$toast.success('Usuario ' + res.username + ' creado')
            this.$router.push('/login')
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
    clickSocial() {
      this.$toast.info('Sorry, not implemented yet.')
    },
  },
  watch: {
    nombre_completo: function () {
      this.errors.nombre_completo = []
    },
    email: function () {
      this.errors.email = []
    },
    password: function () {
      this.errors.password = []
    },
    confirm: function () {
      this.errors.confirm = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #imglogo {
    margin-top: 60px;
  }
  button {
    width: 8rem;
  }
  .container {
    max-width: 400px;
  }
  .img-social {
    height: 40px;
  }
</style>
