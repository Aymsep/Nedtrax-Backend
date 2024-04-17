const constants = require('../Config/constants');
const { verify } = require('../helpers/JWT');
const { responseHandler } = require('../helpers/response');

exports.isAuthenticate = (req, res, next) => {
    const token = (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) ? req.headers.authorization.split(' ')[1] : null; 
    if(!token){
        return responseHandler(res,constants.UNAUTHORIZED)
    }
    try{
        const decoded = verify(token)
        req.user = decoded
        next()
    }catch(error){
        return responseHandler(res,constants.TOKEN_NOT_VALID,error.message )
    }
}