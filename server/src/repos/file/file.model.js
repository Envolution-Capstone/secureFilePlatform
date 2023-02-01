const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, require: true },
  content: { type: String, require: true }
});

const File = new mongoose.model('File', fileSchema);

module.exports = {
  File,
};