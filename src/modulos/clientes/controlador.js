
const TABLA = 'clientes';

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
    function agregar(body){
        return db.agregar(TABLA,body)
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