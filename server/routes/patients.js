const express = require("express");
const router = express.Router();
const patientController= require('../controllers/patients')
const upload = require('../multer');
const signupValitations = require('../utils/validations/signup');

//..........REGISTER PATIENTS ROUTES.....................................................
router.post('/signup',upload.single("image_url"), patientController.register);

//..........NEW REGISTER PATIENTS ROUTES.....................................................
router.post('/register', signupValitations, patientController.patientsRegister);

//..........GET ALL PATIENTS ROUTES.....................................................
router.get('/',patientController.getPatients);

//..........SIGNIN PATIENTS ROUTES.....................................................
router.post('/signin',patientController.login);

module.exports = router;