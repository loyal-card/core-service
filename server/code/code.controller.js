const speakeasy = require("speakeasy");

const getCode = (req, res) => {
  // todo generate code and send back url
  const token = speakeasy.totp({
    secret: "123456",
    encoding: "base32"
  });

  res.send(`http://localhost:5000/api/code/verify-code?code=${token}`);
};

const verifyCode = (req, res) => {
  // todo generate code and send back url
  const code = req.query.code;
  const tokenValidates = speakeasy.totp.verify({
    secret: "123456",
    encoding: "base32",
    token: code,
    window: 6
  });
  if (!tokenValidates) {
    res.send("not verified");
  }
  res.send("OK");
};

module.exports = { getCode, verifyCode };
