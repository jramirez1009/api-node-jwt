const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');
const error = require('./red/error');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

//config
app.set('port', config.app.port)

//rutas
app.use('/api/clientes', clientes)
app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)

app.use(error)

module.exports = app;