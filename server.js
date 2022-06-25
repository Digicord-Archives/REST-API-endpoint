const express = require('express');
const bodyparser = require('body-parser')
const validation = require('express-validator')
const cors = require("cors");
const db = require('./server/utils/database');
const app = express();
const Patient = require('./server/models/patient.model')
const patientRoutes = require('./server/routes/authPatient.route')

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  next()
}) 
 
 // db.execute("SELECT * FROM doctors")
//   .then(result =>{
//     console.log(result[0])
//   })
//   .catch(err =>{
//     console.log(err)
//   })

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

app.use('/auth/api',patientRoutes)

app.use((error,req,res,next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message:message,data:data})
})

// app.get("/", (req, res) => {
//   res.status(200).send({
//     status: "success",
//     data: {
//       message: "Todo API of the SideHustle Portfolio Bootcamp",
//     },
//   });
// });



// // Handle when an invalid route is hitted
// app.all("*", (req, res) => {
//   res.send({
//     status: false,
//     messsage: "Oops! you've hitted an invalid route.",
//   });
// });

const PORT = process.env.PORT || 8000;


db.execute('SELECT * FROM doctors')
.then(result =>{
  console.log(result)
  app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
  })
})
.catch(err =>{console.log(err)
})