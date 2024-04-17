const { getUserByEmail, addUserToDb, getUserById } = require("../database/methods/user.Methods");
const constants = require("../Config/constants");
const { responseHandler } = require("../helpers/response");
const _ = require("lodash");
const { HashPassword, VerifyPassword } = require("../helpers/hashing");
const { sign, verify } = require("../helpers/JWT");



exports.createUser = async (req, res) => {
    const {firstName, lastName,email, password,enable,role} = _.cloneDeep(req.body)
    try{
      const existingUser  = await getUserByEmail(email)
      if(existingUser) return responseHandler(res,constants.USER_ALREADY_EXISTS)
      const hashedPassword = await HashPassword(password)
      const user = await addUserToDb({firstName, lastName,email, password:hashedPassword,enable,role})
      responseHandler(res,constants.REGISTRATION_SUCCESS,user)
    }catch(err){
      responseHandler(res,constants.REGISTRATION_FAILED,err.message)
    }
};
  
exports.getUser = async (req, res) => {
    // Implementation to fetch a user by ID
    const {id} = req.params
    try{
      const user = await getUserById(id)
      if(!user) return responseHandler(res,constants.USER_NOT_FOUND)
      return responseHandler(res,constants.ACCEPTED,user)
    }catch(err){
      return responseHandler(res,constants.INTERNAL_SERVER_ERROR,err.message)
    }
};
  
  exports.updateUser = async (req, res) => {
    // Implementation to update user details
  };
  
  exports.deleteUser = async (req, res) => {
    // Implementation to delete a user
  };
  
  exports.loginUser = async (req, res) => {
      // Implementation to create a user
      const { email, password } = req.body;
      try {
          // Check if user exists
          const user = await getUserByEmail(email)
          if (!user) {
              return responseHandler(res,constants.USER_NOT_FOUND)
          }
          // Compare password
          const isMatch = await VerifyPassword(password, user.password);
          if (!isMatch) {
              return responseHandler(res,constants.PASSWORD_INCORRECT)
          }
  
          // User matched, create JWT payload
          const payload = {
                  id: user.uuid,
                  firstName:user.firstName,
                  lastName:user.lastName,
                  email:user.email,
          };
  
          // Sign token
          const token  = await sign(payload)
          return responseHandler(res,constants.LOGIN_SUCCESS,token)
      } catch (err) {
          console.error(err.message);
          return responseHandler(res,constants.INTERNAL_SERVER_ERROR,err.message)

      }
  };
  
  exports.logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format
    const ttl = (verify(token).exp - Math.floor(Date.now() / 1000));
    redisClientAux.set(token, true, 'EX', ttl, (err, reply) => {
        if (err) {
            return responseHandler(res,constants.LOGIN_FAILED,err.message)
        }
        return responseHandler(res,constants.LOGOUT_SUCCESS)
    });
  };
  
  exports.changePassword = async (req, res) => {
    // Implementation for changing a user's password
  };
  
  exports.assignRole = async (req, res) => {
    // Implementation to assign roles to a user
  };
  