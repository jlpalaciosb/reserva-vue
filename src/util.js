// PLUGIN $util
export default {
  install(app) {
    app.config.globalProperties.$util = {
      holaUtil() {
        console.log('hola util')
      }
    }
  }
}
