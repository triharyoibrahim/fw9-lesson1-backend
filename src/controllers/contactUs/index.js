const contactUsModel = require("../../models/contactUs");
const response = require("../../helpers/standardResponse");
const { LIMIT_DATA } = process.env;
const { validationResult } = require("express-validator");

exports.getAllContactUs = (req, res) => {
  const {
    search = "",
    sortBy = "id",
    sorting = "ASC",
    limit = parseInt(LIMIT_DATA),
    page = 1,
  } = req.query;
  const offset = (page - 1) * limit;

  contactUsModel.getAllContactUs(
    search,
    sortBy,
    sorting,
    limit,
    offset,
    (err, results) => {
      // console.log(err);
      if (results.length < 1) {
        return response(res, "Data not found", null, 404);
      }
      const pageInfo = {};
      contactUsModel.countAllContactUs(search, (err, totalData) => {
        pageInfo.totalData = totalData;
        pageInfo.totalPage = Math.ceil(totalData / limit);
        pageInfo.currentPage = page;
        pageInfo.nextPage =
          pageInfo.currentPage < pageInfo.totalPage
            ? pageInfo.currentPage + 1
            : null;
        pageInfo.previousPage =
          pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;

        return response(res, "List all data", results, pageInfo);
      });
    }
  );
};

exports.createContactUs = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(
      res,
      "Please fill data correctly",
      validation.array(),
      null,
      400
    );
  }
    contactUsModel.createContactUs(req.body, (results) => {
        return response(res, "Created successfully", results[0]);
    });
}

exports.deleteContactUs = (req, res) => {
  const { id } = req.params;

  contactUsModel.deleteContactUs(id, (results) => {
    // console.log(results);
    if (results.rows.length > 0) {
      return response(res, `Success deleted data by id : ${id}`, null);
    } else {
      return response(res, `data by id : ${id} not found`, null, 404);
    }
  });
};

exports.updateContactUs = (req, res) => {
  const { id } = req.params;
  const validation = validationResult(req);
  
  if (!validation.isEmpty()) {
    return response(
      res,
      "Please fill data correctly",
      validation.array(),
      null,
      400
    );
  }

  contactUsModel.updateContactUs(id, req.body, (err, results) => {
    // console.log(results);
        if (results.rows.length > 0) {
      return response(
        res,
        `Update data user id : ${id} successfully`,
        results.rows[0]
      );
    } else {
      return response(res, `data user id : ${id} not found`, null, 404);
    }
  });
};



