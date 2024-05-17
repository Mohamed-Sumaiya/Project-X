const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const applicantsRoutes = require('./routes/applicants-routes');
const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');

const app = express(); // Executing our app.

app.use(bodyParser.json());

// Middleware function to prevent the CORS error.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' ); // This sets headers on the response. // Here we will set 3 headers.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') // This will specify which headers the requests sent by the browser may have. 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE') // This basically controls which HTTP methods may be used on the front-end. 
  next(); // Allow the req to continue it's journey to the other middlewares.
});

// Register middlewares.
app.use('/api/applicants', applicantsRoutes);

app.use('/api/user', userRoutes);

// Error handling for unsupported routes.
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error; // because the code is synchronous we can just throw the error.
})

// Error handling middleware.
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

// Connect to database.
mongoose
  .connect('mongodb+srv://sumaiya_mohamed:uDIhEp6hGME5bb4C@clusterx.lnpzbbz.mongodb.net/database-x?retryWrites=true&w=majority&appName=ClusterX')
  .then(() => {
    // If our connection was succesful.
    app.listen(5000);
  })
  .catch( error => {
    // If our connection was not successful.
    console.log(error);
  })