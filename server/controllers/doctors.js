const Doctors = require('../models/doctors')
const bcrypt = require("bcryptjs");
const jwt= require('jsonwebtoken')
const transporter=require('../nodemailer');
const cloudinary = require('../config/cloudinaryconfig');

    //..........REGISTER DOCTORS  CONTROL.....................................................
exports.register = async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const {doctor_id,first_name,last_name,email,password,specialization,phone_number,age,
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
    const doctor = new Doctors( doctor_id,first_name,last_name,email,encrypedPass,
        specialization,phone_number,age,
        location,sex,image_url,is_available,is_admin);
        
       //..........NODEMAILER CONFIG.....................................................   
    const options = {
      from: "walett95@gmail.com",
      to: [email, "rahdegonline@gmail.com"],
      subject: "Account created successfully",
      text: "Thank you for creating an account with us, your health is our priority.",
    };

    Doctors.create(doctor, (err, data) => {
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

//..........GET ALL DOCTORS CONTROL.....................................................
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

  //..........SIGNIN DOCTORS CONTROL.....................................................
  exports.login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "Both email and password are required.",
      });
    }
  
    Doctors.findByEmail(email, (err, data) => {
      // Handle the error cases
      if (err) {
        if (err.kind === "not_found") {
          return res.status(404).send({
            status: false,
            message: `doctor with email (${email}) does not exist.`,
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
          const token = jwt.sign({ id: data.id }, "digicordscretscret", {
            expiresIn: "1d",
          });
  
          // Filter out the [password] field from the data
          data = Doctors.filterOutPasswordField(data);
  
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