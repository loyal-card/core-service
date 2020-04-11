const Customer = require("./customer.model");

function load(req, res, next, id) {
  Customer.get(id)
    .then((customer) => {
      req.customer = customer; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

function get(req, res) {
  Customer.findOne({ email: req.query.email })
    .then((customer) => {
      if (!customer) {
        return res.status(404).send("not found");
      }
      return res.json(customer);
    })
    .catch((e) => res.status(400).send("bad request"));
}

function create(req, res, next) {
  const customer = new Customer({
    username: req.body.username,
    email: req.body.email,
  });

  customer
    .save()
    .then((savedCustomer) => res.json(savedCustomer))
    .catch((e) => next(e));
}

async function customerPurchase(req, res, next) {
  const cusEmail = req.body.email;
  const purAmount = req.body.amount;
  const filter = { email: cusEmail };

  let currentCus = await Customer.findOne(filter);

  let newAvailableToClaimValue = currentCus.availableToClaim;
  let newTotalClaim = currentCus.totalClaim;
  let newcurrentLoopTotalConsume =
    currentCus.currentLoopTotalConsume + purAmount;

  if (
    currentCus.currentLoopTotalConsume > 0 &&
    currentCus.currentLoopTotalConsume % 5 === 0
  ) {
    newAvailableToClaimValue += 1;
    newTotalClaim += 1;
  }
  if (currentCus.currentLoopTotalConsume >= 20) {
    newcurrentLoopTotalConsume = 0;
  }
  const update = {
    availableToClaim: newAvailableToClaimValue,
    totalConsume: currentCus.totalConsume + purAmount,
    currentLoopTotalConsume: newcurrentLoopTotalConsume,
    totalClaim: newTotalClaim,
  };

  const updatedCustomer = await Customer.findOneAndUpdate(filter, update, {
    new: true,
  });
  return res.json(updatedCustomer);
}

async function claimCredit(req, res, next) {
  const cusEmail = req.body.email;
  const claimNum = req.body.claimAmount;

  const filter = { email: cusEmail };

  let currentCus = await Customer.findOne(filter);

  if (currentCus.availableToClaim < claimNum) {
    return res.status(400).send("unable to claim");
  }
  const update = {
    totalClaim: currentCus.totalClaim + claimNum,
    availableToClaim: currentCus.availableToClaim - claimNum,
  };

  const updatedCustomer = await Customer.findOneAndUpdate(filter, update, {
    new: true,
  });
  return res.json(updatedCustomer);
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Customer.list({ limit, skip })
    .then((customers) => res.json(customers))
    .catch((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user
    .remove()
    .then((deletedUser) => res.json(deletedUser))
    .catch((e) => next(e));
}

module.exports = {
  load,
  get,
  create,
  customerPurchase,
  claimCredit,
  list,
  remove,
};
