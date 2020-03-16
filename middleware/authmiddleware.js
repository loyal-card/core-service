var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


var authCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-l7c1wrq9.au.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://localhost:5000',
    issuer: 'https://dev-l7c1wrq9.au.auth0.com/',
    algorithms: ['RS256']
});

module.exports = authCheck;
