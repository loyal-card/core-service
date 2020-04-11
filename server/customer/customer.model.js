const Promise = require("bluebird");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../helpers/APIError");

/**
 * User Schema
 */
const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      "The value is not a valid email.",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalConsume: {
    type: Number,
    default: 0,
  },
  totalClaim: {
    type: Number,
    default: 0,
  },
  currentLoopTotalConsume: {
    type: Number,
    default: 0,
  },
  availableToClaim: {
    type: Number,
    default: 0,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CustomerSchema.method({});

/**
 * Statics
 */
CustomerSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((customer) => {
        if (customer) {
          return customer;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model("Customer", CustomerSchema);
