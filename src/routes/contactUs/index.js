const express = require("express");
const Router = express.Router();
const contactUsController = require("../../controllers/contactUs");

Router.get("/", contactUsController.getAllContactUs);
Router.post("/",  contactUsController.createContactUs);
Router.delete("/:id", contactUsController.deleteContactUs);


module.exports = Router;
