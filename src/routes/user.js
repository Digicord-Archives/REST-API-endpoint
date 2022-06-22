const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.put('/:id', userController.update);

router.get('/', userController.findAll);

router.get('/:id', userController.findOne);





module.exports = router;
