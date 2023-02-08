const { respondUnAuthorized, respondData } = require('../../util/responses');
const { auth } = require('../../firebase/firebase');

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    // TODO check authentication token
  } else {
    respondUnAuthorized(res);
  }
};

module.exports = {
  checkAuth,
};