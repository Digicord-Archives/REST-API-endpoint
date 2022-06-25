const db = require('../utils/database');

//..........PATIENT COSTRUCTOR MODEL.....................................................
class Patient {
    constructor(patient_id,user_id,first_name,last_name,email,password,
        phone_number,age,location,sex,image_url,is_available,is_admin) {
       this.patient_id = patient_id;
       this.user_id = user_id;
       this.first_name = first_name;
       this.last_name = last_name;
       this.email = email;
       this.password = password;
       this.phone_number = phone_number;
       this.age = age;
       this.location = location;
       this.sex = sex;
       this.image_url = image_url;
       this.is_available = is_available;
       this.is_admin = is_admin;
    
    }

    //..........REGISTER PATIENT MODEL.....................................................
    static create(newUser, result) {
        db.query(
          "INSERT INTO patients VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())",
          [newUser.patient_id,newUser.user_id,newUser.first_name,newUser.last_name,newUser.email,newUser.password,
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

    //..........GET ALL PATIENT MODEL.....................................................
    static getAll(result) {
        db.query("SELECT * FROM patients", (err, res) => {
            if (err){
                console.log("ERROR ", err);
                result(null, err);
                return;
            }
            console.log("patients: ", res);
            result(null, res)
        })
    }

    //..........SIGN IN PATIENTS MODEL.....................................................
static findByEmail(email, result) {
    db.query("SELECT * FROM patients WHERE email = ?", email, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      //   if the user is found
      if (res.length > 0) {
        const foundUser = res[0];
        result(null, foundUser);
        return;
      }
      //   If the user is not found
      result({ kind: "not_found" }, null);
    });
  }
//   This will remove the password field from being displayed
  //   in the data result at the frontend for security reasons.
  static filterOutPasswordField(data) {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !key.includes("password"))
    );

    return filteredData;
  }
}

module.exports = Patient;