const express = require("express");
const router = express.Router();
const doctorController = require('../controllers/doctors');
const open = require('../multer');

router.post('/doctors',open.upload, doctorController.register);

module.exports = router;