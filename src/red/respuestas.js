exports.success = function(req, res, mensaje='OK', status=200){
    res.status(status).send({
        error:false,
        status:status,
        body:mensaje
    })
}

exports.error = function(req, res, mensaje='Internal Error', status=500){    
    res.status(status).send({
        error:false,
        status:status,
        body:mensaje
    })
}