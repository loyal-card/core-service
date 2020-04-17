const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");
const config = require("../../config/config");

// sample user, used for authentication
const staff = {
  username: "coco",
  password: "coco123",
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  if (req.body.username === "coco" && req.body.password === "coco") {
    const token = jwt.sign(
      {
        username: staff.username,
      },
      config.jwtSecret,
      {
        expiresIn: 7200,
      }
    );
    return res.json({
      token: token,
      expiresIn: 7200,
    });
  }
}

module.exports = { login };
