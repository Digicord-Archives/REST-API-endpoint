const express = require("express");
const router = express.Router();
const doctorController = require('../controllers/doctors');
const open = require('../multer');

//..........POST DOCTORS ROUTES.....................................................
router.post('/signup',open.upload, doctorController.register);

//..........GET ALL DOCTORS ROUTES.....................................................
router.get('/',doctorController.getDoctors);

//..........SIGN IN DOCTORS ROUTES.....................................................
router.post('/signin',doctorController.login);

module.exports = router;