// const db = require('../utils/database')

// const Patient = (patient)=>{
//     this.id = patient.id;
//     this.first_name = patient.first_name;
//     this.last_name = patient.last_name;
//     this.email = patient.email
//     this.phone = patient.phone;
//     this.age = patient.age;
//     this.sex = patient.sex;
//     this.location = patient.location;
// }

// //get all patients
// Patient.getAllPatients = (result)=>{
//     const query = "SELECT * FROM patients";
//     db.execute(query,(err,res)=>{
//         if(err){
//             console.log("Error while fetchin patients",err)
//             result(null,err)
//         } else{
//             console.log("Patients fetched successfully")
//             result(null,res)
//         }
//     })
// }

// module.exports = Patient;


