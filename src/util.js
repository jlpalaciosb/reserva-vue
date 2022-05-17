// PLUGIN $util
export default {
  install(app) {
    app.config.globalProperties.$util = {

      holaUtil() {
        console.log('hola util')
      },

      labelHorario(horario) {
        return horario.hora_ini.substr(0, 5) + ' - ' + horario.hora_fin.substr(0, 5)
      },

      // retorna la fecha local de hoy, ej. retorno '2022-05-16'
      localHoyISO() {
        let tzOffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
        let localISODateTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, -1);
        return localISODateTime.substring(0, 10);
      },

    }
  }
}
