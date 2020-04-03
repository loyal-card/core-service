const express = require("express");
const QRCode = require("qrcode.react");
const { getCode, verifyCode } = require("./code.controller");

const authCheck = require("../../middleware/authmiddleware");

const router = express.Router(); // eslint-disable-line new-cap

//router.use("/get-code", authCheck);
router.get("/get-code", getCode);

router.get("/verify-code", verifyCode);

module.exports = router;
