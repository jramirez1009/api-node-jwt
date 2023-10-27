const respuesta = require('./respuestas')
function errors(err, req, res, next) {
    console.error(err)
    const message = err.message || 'Error interno x'
    const status = err.statusCode || 500

    respuesta.error(req, res, message, status)
}
module.exports = errors;