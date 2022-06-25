const db = require('../utils/database');

class Doctors {
    constructor(doctor_id,first_name,last_name,email,password,specialization,
        phone_number,age,location,sex,image_url,is_available,is_admin) {
       this.doctor_id = doctor_id;
       this.first_name = first_name;
       this.last_name = last_name;
       this.email = email;
       this.password = password;
       this.specialization = specialization;
       this.phone_number = phone_number;
       this.age = age;
       this.location = location;
       this.sex = sex;
       this.image_url = image_url;
       this.is_available = is_available;
       this.is_admin = is_admin;
    
    }
    static create(newUser, result) {
        db.query(
          "INSERT INTO doctors VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())",
          [newUser.doctor_id,newUser.first_name,newUser.last_name,newUser.email,newUser.password,newUser.specialization,
            newUser.phone_number,newUser.age,newUser.location,newUser.sex,newUser.image_url,newUser.is_available,
            newUser.is_admin],
          (err, res) => {
            if (err) {
              console.log("error", err);
              result(null, err);
              return;
            }
            console.log("created user", { ...newUser });
            result(null, { id: res.insertId, ...newUser });
          }
        );
      }

}

module.exports = Doctors;