const express = require('express')
// const {body}= require('express-validator')


const  signinPatient= require('../patients/patient.controller')
const  signinDoctor= require('../doctors/doctor.controller')

const router = express.Router()

router.post('/login',signinPatient.login)
router.post('/login',signinDoctor.login)

// router.post('/signup',[
//     body('id').isUUID(),
//     body('fname').trim().not().isEmpty(),
//     body('lname').trim().not().isEmpty(),
//     body('email').isEmail().withMessage('Please enter a valid email').custom((value,{req})=>{
//         return Patient.findAll({email:value}).then(patientDoc =>{
//             if(patientDoc){
//                 return Promise.reject('Email address already exists!')
//             }
//         })
//     })
//     .normalizeEmail(),
//     body('password').trim().not()
//     .isLength({min:5}),
//     body('phone').optional().isInt(),
//     body('age').isNumeric().isInt(),
//     body('sex').optional(),
//     body('location','please enter a location').notEmpty().isString()

    
// ], authCtrlPatient.signup);

module.exports = router 