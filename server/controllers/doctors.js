const Doctors = require('../models/doctors')
const bcrypt = require("bcryptjs");
const transporter=require('../nodemailer');


exports.register = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const {doctor_id,first_name,last_name,email,password,specialization,phone_number,
        location,sex,is_available,is_admin} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    const encrypedPass = hashed;
    const image_url= req.file.filename;
    const doctor = new Doctors( doctor_id,first_name,last_name, email, encrypedPass,
        specialization,phone_number,
        location,sex,image_url,is_available,is_admin);
        
    //nodemailer config    
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

  