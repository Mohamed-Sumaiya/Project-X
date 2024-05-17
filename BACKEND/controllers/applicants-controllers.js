// Get all applicants, POST new applicant, DELETE applicant, UPDATE applicant.
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const Applicant = require('../models/applicant-schema');
const HttpError = require('../models/http-error');

/*
// Dummy data.
let  DUMMY_APPLICANTS = [
    {
      id: 'p1',
      name: "Sumaiya",
      surname: "Mohamed",
      age: 20
    },

    {
      id: 'p2',
      name: "Stephen",
      surname: "Ngago",
      age: 21
    },

  ];
*/

// Controllers.
const getApplicants = async (req, res, next) => {
   let applicants;
   try{
     applicants = await Applicant.find({}) // Mongoose find() method is used to find data from a mongodb database, it accepts 3 args, 1st is a query (a condition), 2nd is query projection (what to include or exclude), 3rd general query options (limit, skip, etc).
   } catch (err) {
     const error = new HttpError('Fetching applicants failed, please try agian later!', 500);
     return next(error);
   }
   
   res.json({ applicants: applicants.map(applicant => applicant.toObject({getters: true}) )});
};

const getApplicantOrgInfo = async (req, res, next) => {
   const applicantId = req.params.aid
   let applicant;

   try{
     applicant = await Applicant.findById(applicantId);
   } catch (err) {
    const error = new HttpError('Something went wrong, could not find an applicant.', 404);
    return next(error);
   }

   if(!applicant) {
    const error = new HttpError('Could not find an applicant with the provided id.');
    return next(error);
   }

   console.log(applicant.toObject({getters: true}))
   // Setting getters to true will get rid of the underscore infront of the id.
   res.json( {applicant: applicant.toObject({getters: true})} );
};

const createApplicant = async (req, res, next) => { 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    const error = new HttpError('Invalid data passed, please check your inputs.', 422);
    return next(error);
   }

   const { name, surname, age } = req.body;
   
   // new applicant.
   const createdApplicant =  new Applicant(
      {
        // removed the uuid because it will automatically receive an id thanks to mongodb.
        name,
        surname,
        age
      }
   );

   let applicant;
   try{
     await createdApplicant.save() // save the document using the schema(model).
   } catch (err) {
    const error = new HttpError('Creating a new applicant failed, please try again later.', 500);
    return next(error);
   }

   res.status(201).json({ applicant: createdApplicant });
};

const updateApplicant = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError('Invalid data passed, please check your inputs.', 422);
      return next(error);
    }

    const { name, surname, age } = req.body;

    const applicantId = req.params.aid; // aid = applicant id
    
    // Find the applicant to update using their id.
    let applicant;
    try{
      applicant = await Applicant.findById(applicantId);
    } catch (err) {
      const error = new HttpError('Could not find an applicant.', 500);
      return next(error);
    }
   
    // Update the data.
    applicant.name = name;
    applicant.surname = surname;
    applicant.age = age;

    // Save the updated applicant.
    try{
      await applicant.save();
    } catch (err) {
      const error = new HttpError('Could not save the updated applicant data.', 500 );
    }

    res.status(200).json({ applicant: applicant.toObject({ getters: true })}); // Convert the mongoose object to a normal javascript object.
};

const deleteApplicant = async (req, res, next) => {
   const applicantId = req.params.aid; // aid = applicant id.

   let applicant;

   // Find the applicant uisng their id.
   try{
     applicant = await Applicant.findById(applicantId);
   } catch (err) {
     const error = new HttpError('Could not find an applicant', 500);
     return next(error);
   }
   
   // If the applicant does not exist throw an error.
   if(!applicant){
    const error = new HttpError('Applicant does not exist', 404);
    return next(error);
   }
   
   // Otherwise if an applicant is found delete their data.
   await applicant.deleteOne()
   
   res.status(200).json({ message: 'Applicant deleted successfully!'})
};

exports.getApplicants = getApplicants;
exports.createApplicant = createApplicant;
exports.updateApplicant = updateApplicant;
exports.deleteApplicant = deleteApplicant;
exports.getApplicantOrgInfo = getApplicantOrgInfo;