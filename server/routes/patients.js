const express = require("express");
const router = express.Router();
const patientController= require('../controllers/patients')
const open = require('../multer');

//..........REGISTER PATIENTS ROUTES.....................................................
router.post('/signup',open.upload, patientController.register);

//..........GET ALL PATIENTS ROUTES.....................................................
router.get('/',patientController.getPatients);

//..........SIGNIN PATIENTS ROUTES.....................................................
router.post('/signin',patientController.login);

module.exports = router;