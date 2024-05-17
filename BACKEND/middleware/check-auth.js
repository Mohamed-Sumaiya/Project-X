const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

const checkAuth = (req, res, next) => {
  if(req.method === 'OPTIONS') {
        return next(); // Allow the options request to continue.
  };

  try{
     const token = req.headers.authorization.split(' ')[1]; // Extract the token not the entire string.
     
     if(!token) { // I fthere is no valid token.
       throw new HttpError('Authorization failed, could not find a valid token.', 404);
     }

     const decodedToken = jwt.verify(token, 'super_secret_key'); // Will return a string or object.
     
     // At this point we know that the checkAuth didn't fail and the user is authenticated.
     // Add data to the request.
     req.userData = { userId : decodedToken.userId};

     // Allow the request to continue to the route it is meant for.
     next();
   } catch (err) { // This error will run if the split() fails.
      const error = new HttpError('Authorization failed!', 403);
      return next(error);
   }
};

module.exports = checkAuth;