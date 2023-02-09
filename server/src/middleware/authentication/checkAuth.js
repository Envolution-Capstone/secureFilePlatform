const { respondUnAuthorized, respondData } = require('../../util/responses');
const { getAuth } = require('firebase-admin/auth');

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    getAuth()
    .verifyIdToken(req.headers.authtoken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      req.userid = uid;
      next();
    })
    .catch((error) => {
      console.log(error);
      respondUnAuthorized(res);
    });
  } else {
    respondUnAuthorized(res);
  }
};

module.exports = {
  checkAuth,
};