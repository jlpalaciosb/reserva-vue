// PLUGIN $util
export default {
  install(app) {
    app.config.globalProperties.$util = {
      holaUtil() {
        console.log('hola util')
      },
      labelHorario(horario) {
        return horario.hora_ini.substr(0, 5) + ' - ' + horario.hora_fin.substr(0, 5)
      }
    }
  }
}
