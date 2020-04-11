const Joi = require("joi");

module.exports = {
  // POST /api/customers
  createCustomer: {
    body: {
      username: Joi.string().required(),
      email: Joi.string()
        .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        .required(),
    },
  },
  // POST /api/customers/purchase
  purchase: {
    body: {
      amount: Joi.number().required(),
    },
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string()
        .regex(/^[1-9][0-9]{9}$/)
        .required(),
    },
    params: {
      userId: Joi.string().hex().required(),
    },
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
