const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

const checkAuthRole = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next(); // Allow the request to continue.
    }

    try{
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            throw new Error('Authorization failed, could not find a valid token.');
        }

        const decodedToken = jwt.verify(token, 'super_secret_key');

        if(decodedToken && decodedToken.role === 'admin' || decodedToken.role === 'administrator'){
           console.log(decodedToken.role)
           next();
        } else {
           const error = new HttpError('Unauthorized!, only the admin or administrator are allowed to access these routes.')
           return next(error)
        }
    
    } catch (err) {
        const error = new HttpError('Authorization failed!', 403);
        return next(error);
    }
};

module.exports = checkAuthRole;