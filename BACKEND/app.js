const express = require('express');
const bodyParser = require('body-parser');

const applicantsRoutes = require('./routes/applicants-routes');
const formRoutes = require('./routes/form-routes');
const userRoutes = require('./routes/user-routes');

const app = express(); // Executing our app.

app.use(bodyParser.json());

// Register middlewares.
app.use('/api/applicants', applicantsRoutes);
app.use('/api/form', formRoutes);
app.use('/api/user', userRoutes);