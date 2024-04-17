const {redisClientAux} = require('../libs/REDISconnection')
const constants = require('../Config/constants');
const { responseHandler } = require('../helpers/response');


exports.checkBlacklist = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try{
        redisClientAux.get(token, (err, result) => {
            console.log(err)
            if (err) {
                return responseHandler(res,constants.TOKEN_NOT_VALID,err.message)
            }
            if (result) {
                return responseHandler(res,constants.TOKEN_REVOKED,result)
    
            }
            next();
        });
    }catch(err){
        return responseHandler(res,constants.INTERNAL_SERVER_ERROR,err.message)
    } 

};

