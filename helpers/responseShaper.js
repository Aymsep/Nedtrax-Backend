// responseShaper.js

function shapeUser(user) {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        
    };
}

function shapeUserRole(userRole) {
    return {
        role: userRole.role,
       
    };
}

function shapeUserPermissions(userPermissions) {
    return userPermissions ? {
        permissions: userPermissions.permissions,
       
    } : null;
}

module.exports = {
    shapeUser,
    shapeUserRole,
    shapeUserPermissions
};
