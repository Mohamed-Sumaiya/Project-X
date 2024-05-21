const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDB = mongoose.createConnection('mongodb+srv://sumaiya_mohamed:uDIhEp6hGME5bb4C@clusterx.lnpzbbz.mongodb.net/Users?retryWrites=true&w=majority&appName=ClusterX');

const userSchema = new Schema(
    {
        // The id will be generated automatically.
        name: { type: String},
        email: { type: String},
        role: { type: String},
        password: { type: String},
    }
)

module.exports = userDB.model('Users', userSchema);