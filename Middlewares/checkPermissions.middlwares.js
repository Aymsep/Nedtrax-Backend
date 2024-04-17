const {getUserByPermissions } = require("../database/methods/user.Methods");
const constants = require("../Config/constants");
const { responseHandler } = require("../helpers/response");

const checkPermissions = (entityName,action) => async (req, res, next) => {
    try {
        const userId = req.user.id;  // Assuming 'req.user' is set by previous auth middleware
        const user = await getUserByPermissions(userId,entityName);

        if (!user || !user.role || user.permissions.length === 0) {
            return responseHandler(res,constants.INSUFFICIENT_PERMISSIONS)
        }

        if (user.role.role === 'admin') {
            return next();
        }
        const hasPermission = user.permissions.some(permission => 
            permission.entity.name === entityName && permission.permissions.includes(action)
        );
        if(!hasPermission) return responseHandler(res,constants.INSUFFICIENT_PERMISSIONS) 
            

        next();
    } catch (error) {
        console.error('Permission check error:', error);
        return responseHandler(res,constants.INTERNAL_SERVER_ERROR,error.message)
    }
};

module.exports = checkPermissions;