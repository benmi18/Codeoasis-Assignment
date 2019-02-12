const mongoose = require('./DBConnect');
const Schema = mongoose.Schema;

const DeviceHistorySchema = new Schema({
  device_name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  room: {
    type: Number,
    required: true
  },
  created_at: { type: Date, required: true, default: Date.now }
});

const DeviceHistoryModel = mongoose.model(
  'device_history',
  DeviceHistorySchema
);
module.exports = DeviceHistoryModel;
