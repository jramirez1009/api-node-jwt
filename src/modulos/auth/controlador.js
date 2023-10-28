
const TABLA = 'auth';
const bcrypt= require('bcrypt')
const authentication = require('../../authentication')

module.exports =function(db) {
    if(!db){
        db = require('../../DB/mysql');
    }

   async function login(usuario, password) {
    console.log(usuario,password); 
    const data = await db.query(TABLA, {usuario:usuario})
     return bcrypt.compare(password, data.password)
     .then(resultado => {
        if(resultado){
            return authentication.asignarToken({
                ...data
            })
        }else{
            throw new Error('Información invalida');
        }
     })
   }
   
    async function agregar(data){
        const authData = {
            id:data.id
        }
        if(data.usuario){
            authData.usuario = data.usuario
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(),3) 
        }
        return db.agregar(TABLA,authData)
    }
 
    return {
       
        agregar,
        login
      
    }    
    
    
    
}