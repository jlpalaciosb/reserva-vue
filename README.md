<p align="center"><img src="public/images/logo-color.png" width="300"></p>

## Acerca de ReservasYa

ReservasYa es una aplicación web donde los usuarios pueden reservar recursos limitados. El usuario administrador gestiona los recursos y horarios reservables.

## Características

Este repositorio corresponde al frontend de la aplicación, fue desarrollado con las siguientes teconologías:

- Framework JS Vue 3.
- Librerias CSS Bootstrap 4 y Font Awesome Free 5.
- Libreria Axios para peticiones ajax.
- Desarrollo de componentes, componentes reutilizables, componentes globales y componentes hijos.
- Almacenamiento de datos de sesión.
- Vistas dinámicas controlando los permisos del usuario logueado.
- Datatables paginados.
- Variables de estado globales con Vuex.
- Rutas de la app web implementado con Vue Router.
- Toast alerts. Loading overlay.

El backend se encuentra en [jlpalaciosb/reserva-laravel](https://github.com/jlpalaciosb/reserva-laravel).

## Project setup

### Set environment variables
```
cp .env .env.local
```

### Install dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
