const Patient = require('../models/patients');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const transporter=require('../nodemailer');
const cloudinary = require('cloudinary');
const { validationResult } = require('express-validator');
const db = require('../utils/database');

 //..........REGISTER PATIENTS  CONTROL.....................................................
exports.register = async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const {patient_id,user_id,first_name,last_name,email,password,phone_number,age,
        location,sex,is_available,is_admin} = req.body;
        const filstring = req.file.path || req.body.data;
        const result = await cloudinary.uploader.upload(filstring,{
              upload_preset:"unsigned"
            });
    console.log(result);
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    const encrypedPass = hashed;
    const image_url= result.url;
    const patient = new Patient( patient_id,user_id,first_name,last_name,email,encrypedPass,
    phone_number,age,location,sex,image_url,is_available,is_admin);
        
   
  exports.getDoctors = (req, res) => {
  
    Doctors.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting users."
        });
      else res.send(data);
    });
  };  
   //..........NODEMAILER CONFIG.....................................................
    const options = {
      from: "walett95@gmail.com",
      to: [email, "rahdegonline@gmail.com"],
      subject: "Account created successfully",
      text: "Thank you for creating an account with us, your health is our priority.",
    };

    Patient.create(patient, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred",
        });
        return;
      }
      res.status(200).send(data);
      transporter.sendMail(options, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent :", data.response);
        }
      });
    });
  };
//..........GET ALL PATIENTS CONTROL.....................................................
exports.getPatients = (req, res) => {
  
    Patient.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting users."
        });
      else res.send(data);
    });
  };
  
   //..........SIGNIN PATIENT CONTROL.....................................................
   exports.login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "Both email and password are required.",
      });
    }
  
    Patient.findByEmail(email, (err, data) => {
      // Handle the error cases
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: false,
            message: `patient with email (${email}) does not exist.`,
          });
        } else {
          return res.status(500).send({
            status: false,
            message: "Some error occurred, please try again",
          });
        }
      }
  
      // Handle when the user exist
      if (data) {
        //   Compare the typed password with the user's password hash
        if (bcrypt.compareSync(password, data.password)) {
          // Create a token for the user
          const token = jwt.sign({ id: data.id }, "digisecrettoken", {
            expiresIn: "1d",
          });
  
          // Filter out the [password] field from the data
          data = Patient.filterOutPasswordField(data);
  
          return res.status(200).send({
            status: true,
            token: token,
            message:"User login successfully",
            data: { ...data },
          });
        }
  
        // Handle when the password is incorrect
        return res.status(401).send({
          status: false,
          message: "Incorrect password.",
        });
      }
    });
  };

   // .............New Logic............................................
exports.patientsRegister = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      body: errors.array()
    })
  }

  const {
    first_name, last_name, email, phone_number, age, sex, location, password, confirm_password
  } = req.body;

  if(password !== confirm_password){
    return res.status(400).json({
      status: false,
      body: 'passwords do not match'
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // store in database
    const queryStatement = `INSERT INTO patients (first_name, last_name, email, phone_number, age, sex, location, password) VALUES (?,?,?,?,?,?,?,?)`;
    const result = await db.execute(queryStatement, [first_name, last_name, email, phone_number, age, sex, location, hashedPassword]);
    
    // generate token
    const token = jwt.sign({ id: result[0].insertId }, process.env.JWT_SECRET)
    return res.status(201).json({
      status: true,
      body: {
        first_name, last_name, email, phone_number, age, sex, location, token,
        userId: result[0].insertId
      }
    });

  } catch (error) {
    
    if(error.code == 'ER_DUP_ENTRY'){
      return res.status(400).json({
        status: false,
        body: 'user already exists, please login'
      })
    }

    return res.status(400).json({
      status: false,
      body: error.message
    })
  }
}

  