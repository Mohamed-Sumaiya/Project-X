// GET all applicants, POST new applicant, DELETE applicant, PATCH applicant.
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAuthRole = require('../middleware/check-auth-role');
const applicantsControllers = require('../controllers/applicants-controllers');

// Users will only be allowed to access the below routes if the are authenticated.
router.use(checkAuth);

// routes.
/* Add validation for this route */
router.post('/create',
 [
   check('name').not().isEmpty(),
   check('surname').not().isEmpty(),
   check('age').not().isEmpty()
 ],
 applicantsControllers.createApplicant);


// Users will only be allowed to access the below if they are the admin || administrator.
router.use(checkAuthRole);

router.get('/:aid',
 [
   check('name').not().isEmpty(),
   check('surname').not().isEmpty(),
   check('age').not().isEmpty()
 ],
  applicantsControllers.getApplicantOrgInfo);

router.get('/', applicantsControllers.getApplicants);

/* Add validation for this route */
router.patch('/:aid',
 [
   check('name').not().isEmpty(),
   check('surname').not().isEmpty(),
   check('age').not().isEmpty()
 ],
 applicantsControllers.updateApplicant);

router.delete('/:aid', applicantsControllers.deleteApplicant);

module.exports = router;

