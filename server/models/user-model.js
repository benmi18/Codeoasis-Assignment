const mongoose = require('./DBConnect');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  logedin: {
    type: Boolean
  }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
