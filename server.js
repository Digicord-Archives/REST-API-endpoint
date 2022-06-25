const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const doctorsRouter = require('./Server/routes/doctors');
const patientRouter= require('./Server/routes/patients');


const app = express();

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));

app.use(cors());



app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "welcome to Digicord Backend",
    },
  });
});

app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/patients", patientRouter);


// Handle when an invalid route is hitted
app.all("*", (req, res) => {
  res.send({
    status: false,
    messsage: "Oops! you've hitted an invalid route.",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
