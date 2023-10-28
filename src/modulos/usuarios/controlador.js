
const auth = require('../auth')
const TABLA = 'usuarios';

module.exports =function(db) {
    if(!db){
        db = require('../../DB/mysql');
    }
    function listado(){
        return db.listado(TABLA)
    }
    function listadofiltro(id){
        return db.listadofiltro(TABLA,id)
    }
    async function agregar(body){
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        }
        const respuesta =  await db.agregar(TABLA, usuario);
        let insertId = 0;
        if(body.id === 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id;
        }
        let respuesta2 = '';
        if(body.usuario || body.password){
            respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password:body.password

            })
        }

        return respuesta2;        
    }
    function eliminar(body){
        return db.eliminar(TABLA,body)
    }
    return {
        listado,
        listadofiltro,
        agregar,
        eliminar
    }    
    
    
    
}