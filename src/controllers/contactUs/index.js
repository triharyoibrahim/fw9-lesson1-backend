const contactUsModel = require("../../models/contactUs");
const response = require("../../helpers/standardResponse");

exports.getAllContactUs = (req, res) => {
  contactUsModel.getAllContactUs((results) => {
    return response(res, "Success get data", results);
  });
};

exports.createContactUs = (req, res) => {
    contactUsModel.createContactUs(req.body, (results) => {
        return response(res, "Created successfully", results[0]);
    });
}

