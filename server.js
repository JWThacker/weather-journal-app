// Define endpoint to hold user entered data
const projectData = {};

// Load necessary dependancies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Instantiate instance of the app
const app = express();

// Tell app to use approprate middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Define the port for our app
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

// Respond to a client get-request by sending the data in the projectData endpoint
app.get("/allData", (req, res) => {
  res.send(projectData);
});

// An artifact for my future reference
// app.get("/addData", (req, res) => {
//   res.sendFile(__dirname + "/form-control-practice.html");
// })

// Post weather and user entered data into the projectData endpoint
app.post("/addData", (req, res) => {
  const temp = req.body.temp;
  const dateTime = req.body.dt;
  const userRes = req.body.feels;
  projectData["temperature"] = temp;
  projectData["dt"] = dateTime;
  projectData["feels"] = userRes;
  res.send(projectData);
});