const multer = require('multer');


const moduleStore = multer.memoryStorage();
const upload = multer({
  storage: moduleStore,
});
const Fields = [
  { name: 'file', maxCount:1 },
];
const uploadFile = (req) => {
  return new Promise((resolve, reject) => {
    upload.fields(Fields)(req, {}, (error) => {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
};

module.exports = {
  uploadFile,
}