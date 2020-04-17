const express = require("express");
const validate = require("express-validation");
const expressJwt = require("express-jwt");
const paramValidation = require("../../config/param-validation");
const { login } = require("./auth.controller");
const config = require("../../config/config");

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route("/login").post(validate(paramValidation.login), login);

module.exports = router;
