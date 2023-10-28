const auth = require('../../authentication')
module.exports = function chekAuth(){
    function middleware(req, res, next){
        // const id = req.body.id
        // auth.checkToken.confirmToken(req, id)
        
        auth.checkToken.confirmToken(req)
        next()
        
        
    }
    return middleware;
}