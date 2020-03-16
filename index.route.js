const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');

const authCheck = require('./middleware/authmiddleware');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */

router.use('/get-code', authCheck);
router.get('/get-code', (req, res) =>
  // todo generate code and send back url
  res.send('OK')
);


// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
