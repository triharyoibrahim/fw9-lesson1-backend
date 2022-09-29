const express = require("express");
const Router = express.Router();
const contactUsController = require("../../controllers/contactUs");
const { body } = require("express-validator");

const validation = [
    body("name").notEmpty().withMessage("Please input your name"),
    body("email")
    .isEmail().withMessage("Please input email correctly").normalizeEmail()
    .notEmpty().withMessage("Please input your email"),
    body("message")
    .notEmpty().withMessage("Please input your your message")
  ];
  

Router.get("/", contactUsController.getAllContactUs);
Router.post("/",  validation, contactUsController.createContactUs);
Router.delete("/:id", contactUsController.deleteContactUs);
Router.patch("/:id", validation,  contactUsController.updateContactUs);


module.exports = Router;
