const jwt = require('jsonwebtoken');
const config = require('../config');
const secret =  config.jwt.secret;

function asignarToken(data){
    return jwt.sign(data,secret)
}

function verifyToken(token){
    return jwt.verify(token,secret)
}

const checkToken = {
    confirmToken:function(req){
        const decode = decodeHeaders(req)
      /*  if(decode.id !== id){
            throw new Error('Without Authorization')
        }*/
    }
}

function decodeHeaders(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verifyToken(token);
    req.user = decode;
    return decode;
}

function getToken(auth){
    if(!auth){
        throw new Error('Token empty')
    }
    if(auth.indexOf('Bearer') === -1){
        throw new Error('Format not valid')
    }
    let token = auth.replace('Bearer ', '')
    return token;
}



module.exports  = {
    asignarToken,
    checkToken
}