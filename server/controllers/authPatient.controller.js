
// const {validationResult} = require('express-validator')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const Patient = require('../models/patient.model');


// exports.signup=(req,res,next)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         const error = new Error('validation failed');
//         error.statusCode= 422;
//         error.data = errors.array();
//         throw error;
//     }

//     const id = req.body.id;
//     const fname=req.body.fname;
//     const lname=req.body.lname;
//     const email=req.body.email;
//     const password=req.body.password;
//     const phone=req.body.phone;
//     const age = req.body.age;
//     const sex=req.body.sex;
//     const location=req.body.location;
//     // const img = req.body.img;
//     // const status=req.body.status;
//     // const createdOn=req.body.createdOn;
//     bcrypt
//     .hash(password,12)
//     .then(hashedPw =>{
//         const patient = new Patient({
//             id:id,
//             fname:fname,
//             lname:lname,
//             email:email,
//             password:hashedPw,
//             phone:phone,
//             age:age,
//             sex:sex,
//             location:location,
//         });
//         return patient.save()
//     })
//     .then(result=>{
//         res.status(201).json({message:"Patient created",patientId:result._id})
//     })
//     .catch(err => {
//     if(!err.statusCode){
//         err.statusCode=500;
//     } 
//     next(err)   
//     })
// }

// exports.login=(req,res,next)=>{
//     const email = req.body.email;
//     const password=req.body.password;
//     let loadedPatient;
//     const queryPromise = Patient.findOne({email:email}).exec()
//            queryPromise.then(patient =>{
//                if(!patient){
//                    const error = new Error('A patient with the email could not be found')
//                    error.statusCode=401;
//                    throw error;
//                }
//                loadedPatient=patient;
//                return bcrypt.compare(password,patient.password)
//            })
//            .then(isEqual =>{
//                if(!isEqual){
//                    const error = new Error('Wrong password')
//                    error.statusCode=401;
//                    throw error;
//                }

//         const token = jwt.sign(
//             {
//                 email:loadedPatient.email,
//                 patientId:loadedPatient._id.toString()
//             },
//             'digicordscretscret',
//             {expiresIn:'1h'}
//         );
//         res.status(200).json({token:token,patientId:loadedPatient._id.toString()})
//            })
//            .catch(err =>{
//                if(!err.statusCode){
//                    err.statusCode=500
//                }
//            })
// }