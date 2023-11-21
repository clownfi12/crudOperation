const express = require('express');

const routes = express.Router();

console.log("index routing");

const St = require("../models/Student");

const adminController = require("../controllers/adminController")

routes.get("/", adminController.addDetails);

routes.post("/addStudentDetails",St.uploadedImage, adminController.addStudentDetails);

routes.get("/view_details", adminController.view_details);


routes.get("/deleteStudent/:id", adminController.deleteStudent);

routes.get("/updateStudent/:id", adminController.updateStudent);

routes.post("/EditStudentDetails",St.uploadedImage,adminController.EditStudentDetails);

module.exports = routes;