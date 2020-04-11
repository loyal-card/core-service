const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const {
  list,
  create,
  customerPurchase,
  remove,
  load,
} = require("./customer.controller");

const router = express.Router(); // eslint-disable-line new-cap

router
  .route("/")
  /** POST /api/customers - Create new user */
  .post(validate(paramValidation.createCustomer), create);

router
  .route("/purchase")
  /** POST /api/customers/purchase - post purchase */
  .post(validate(paramValidation.purchase), customerPurchase);

router
  .route("/:userId")
  /** GET /api/users/:userId - Get user */

  /** PUT /api/users/:userId - Update user */
  // .put(validate(paramValidation.updateUser), update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(remove);

/** Load user when API with userId route parameter is hit */
router.param("userId", load);

module.exports = router;
