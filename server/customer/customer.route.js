const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../../config/param-validation");
const {
  list,
  get,
  create,
  customerPurchase,
  claimCredit,
  remove,
  load,
} = require("./customer.controller");

const router = express.Router(); // eslint-disable-line new-cap

router.route("/").post(validate(paramValidation.createCustomer), create);

router.route("/get").get(get);

router
  .route("/purchase")
  .post(validate(paramValidation.purchase), customerPurchase);

router.route("/claim").post(validate(paramValidation.claim), claimCredit);

router
  .route("/:userId")
  // .put(validate(paramValidation.updateUser), update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(remove);

/** Load user when API with userId route parameter is hit */
router.param("userId", load);

module.exports = router;
