const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, require: true }
});

const Group = new mongoose.model('Group', groupSchema);

module.exports = {
  Group,
};