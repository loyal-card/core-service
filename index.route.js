const express = require("express");
const customerRoutes = require("./server/customer/customer.route");
const authRoutes = require("./server/auth/auth.route");
const codeRoutes = require("./server/code/code.route");

const authCheck = require("./middleware/authmiddleware");

const router = express.Router(); // eslint-disable-line new-cap

// mount user routes at /customers
router.use("/customers", customerRoutes);

// mount auth routes at /auth
router.use("/auth", authRoutes);

router.use("/code", codeRoutes);

module.exports = router;
