const express = require("express");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "Todo API of the SideHustle Portfolio Bootcamp",
    },
  });
});



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
