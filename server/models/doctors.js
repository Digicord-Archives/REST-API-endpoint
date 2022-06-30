const db = require('../utils/database');

    //.......... DOCTORS CONSTRUCTOR MODEL.....................................................
class Doctors {
    constructor(params) {
       this.doctor_id = params.doctor_id;
       this.first_name = params.first_name;
       this.last_name = params.last_name;
       this.email = params.email;
       this.password = params.password;
       this.specialization = params.specialization;
       this.phone_number = params.phone_number;
       this.age = params.age;
       this.location = params.location;
       this.sex = params.sex;
       this.image_url = params.image_url;
       this.is_available = params.is_available;
       this.is_admin = params.is_admin;
    
    }
    //..........REGISTER DOCTORS MODEL.....................................................
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

//..........SIGN IN DOCTORS MODEL.....................................................
static findByEmail(email, result) {
  db.query("SELECT * FROM doctors WHERE email = ?", email, (err, res) => {
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



//..........GET ALL DOCTORS MODEL.....................................................
      static getAll(result) {
        db.query("SELECT * FROM doctors", (err, res) => {
            if (err){
                console.log("ERROR ", err);
                result(null, err);
                return;
            }
            console.log("users: ", res);
            result(null, res)
        })
    }

  
}

module.exports = Doctors;