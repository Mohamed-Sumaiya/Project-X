const jwtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Sumaiya",
        email: "sumaiya@gmail.com",
        role: "admin",
        password: '123456',
    },

    {
        id: "u2",
        name: "Jane",
        email: "jane@gmail.com",
        role: "public user",
        password: '111111',
    },

    {
        id: "u3",
        name: "John",
        email: "john@gmail.com",
        role: "public user",
        password: '222222',
    }
]

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError('Invalid data passed, please check your inputs.', 422);
      return next(error);
    }
   
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(user => user.email === email);
    
    if (!identifiedUser) {
      const error = new HttpError('User does not exist!', 404);
      return next(error);
    }

    if(identifiedUser && identifiedUser.password !== password){
      const error = new HttpError('Password incorrect!', 401);
      return next(error);
    }

    // Now that we know that the user exists and the password is correct we can generate a token.
    let token;

    const payload = {
       userId: identifiedUser.id,
       role: identifiedUser.role,
       expiresIn: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // a month.
    }

    try {
      token = jwtoken.sign( payload, 'super_secret_key');
    } catch (err) {
      const error = new HttpError('Could not generate a token for user on login, please try again', 500);
      return next(error);
    }
    
    res.json({ user: identifiedUser, token: token});
};

exports.login = login;