const express = require("express");
const userRoutes = require("./server/user/user.route");
const authRoutes = require("./server/auth/auth.route");
const speakeasy = require("speakeasy");

const authCheck = require("./middleware/authmiddleware");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
//router.use("/get-code", authCheck);
router.get("/get-code", (req, res) => {
  // todo generate code and send back url
  const token = speakeasy.totp({
    secret: "123456",
    encoding: "base32"
  });

  res.send(`http://localhost:5000/api/verify-code?code=${token}`);
});
router.get("/verify-code", (req, res) => {
  // todo generate code and send back url
  const code = req.query.code;
  const tokenValidates = speakeasy.totp.verify({
    secret: "123456",
    encoding: "base32",
    token: code
  });


  if (!tokenValidates) {
    res.send("not verified");
  }
  global.io.emit("FromAPI", "test")
  res.send("OK");
});

// mount user routes at /users
router.use("/users", userRoutes);

// mount auth routes at /auth
router.use("/auth", authRoutes);

module.exports = router;
