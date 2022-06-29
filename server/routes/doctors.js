const express = require("express");
const router = express.Router();
const doctorController = require('../controllers/doctors');
const upload = require('../multer');

//..........POST DOCTORS ROUTES.....................................................
router.post('/signup',upload.single("image_url"), doctorController.register);

//..........GET ALL DOCTORS ROUTES.....................................................
router.get('/',doctorController.getDoctors);

//..........SIGN IN DOCTORS ROUTES.....................................................
router.post('/signin',doctorController.login);

module.exports = router;