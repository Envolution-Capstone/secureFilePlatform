const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  password: { type: String, require: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

const User = new mongoose.model('User', userSchema);

module.exports = {
  User,
};