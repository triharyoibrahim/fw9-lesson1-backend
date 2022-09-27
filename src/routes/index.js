const express = require("express");
const Router = express.Router();

Router.use("/contactus", require("../routes/contactUs"));

module.exports = Router;