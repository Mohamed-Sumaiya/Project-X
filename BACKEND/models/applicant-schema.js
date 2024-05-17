const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicantSchema = new Schema(
    {
        // The id will be created automatically by mongodb if you store a document.
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true}
    }
)

// We will now use this in the applicant-controllers folder.
module.exports = mongoose.model('Applicant', applicantSchema); // Our collection name will be applicants. // Pointer.