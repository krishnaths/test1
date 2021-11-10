//loading the express and body-parser helpers
const express = require("express");
const cors = require("cors");
const path = require("path");

//creating a app instance from express
const app = express();

//this is required to access the JSON files using Node File system
const fs = require("fs");

//using cors on the whole app
app.use(cors());

//this tells the express to handle json and string/array type of data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving static files
app.use("/", express.static(path.join(__dirname, "dist")));

//loading the routing file
//passing the app instance and the Node file instance to the routes
const routes = require("./route/routes")(app, fs);

//loading the app on the desired port
const server = app.listen(3001, () => {
  console.log("Listening on port 3001");
});
