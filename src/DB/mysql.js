const  mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/respuestas');

const dbconfig = {
    host: config.mysql.host,
    user:config.mysql.user,
    password:config.mysql.password,
    database:config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if(err){
            console.log(err);
            setTimeout(conMysql(), 200)
        }else{
            console.log('connection ok!');
        }
    })
    conexion.on('error', err => {
        console.log(err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}
conMysql();

function listado(tabla){
   return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
             return error ? reject(error) : resolve(result);
        })
    })

}

function listadofiltro(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}


function agregar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ? `, [data,data] , (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

/*
Antes de optmizar
function agregar(tabla, data){
    if(data && data.id == 0){
        return insertar(tabla, data)
    }else{
        return actualizar(tabla, data)
    }
}

function insertar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data , (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function actualizar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id] , (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}
*/
function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`, data.id , (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function query(tabla, consulta){
    
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta , (error, result) => {
            if(error) return reject(error);            
            resolve(result[0]);
        })
    })
}

module.exports = {
    listado, 
    listadofiltro,
    agregar,
    eliminar,
    query

}