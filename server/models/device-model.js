const mongoose = require('./DBConnect');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const DeviceModel = mongoose.model('device', DeviceSchema);
module.exports = DeviceModel;
