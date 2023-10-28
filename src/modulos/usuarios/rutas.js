const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./index')
const router = express.Router();

router.get('/', listado);
router.get('/:id', listadofiltro);
router.post('/', agregar);
router.delete('/', eliminar);


async function listado (req, res, next)  {
    
    try {
        const items = await controlador.listado()
        respuesta.success(req, res, items, 200)
    } catch (error) {
        next(error)   
    }
    
};
async function listadofiltro (req, res, next)  {
    try {
        const items = await controlador.listadofiltro(req.params.id)
        respuesta.success(req, res, items, 200)    
    } catch (error) {
        next(error)   
    }  
    
};

async function agregar (req, res, next)  {
    try {
        const items = await controlador.agregar(req.body)
        if(req.body.id === 0){
            mensaje = 'Item guardado con exito!'
        }else{
            mensaje = 'Item actualizado con exito!'
        }
        respuesta.success(req, res, mensaje, 201)    
    } catch (error) {
       next(error)
    }
    
};

async function eliminar (req, res, next)  {
    try {
        const items = await controlador.eliminar(req.body)
        respuesta.success(req, res, 'Item eliminado!', 200)    
    } catch (error) {
       next(error)
    }
    
};

// router.get('/', function(req, res){
//     const todos = controlador.listado()
//     .then((items) => {
//         respuesta.success(req, res, items, 200)
//     })
    
// });
module.exports = router;