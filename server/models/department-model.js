const mongoose = require('./DBConnect');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String
  },
  department_number: {
    type: Number
  },
  department_room_list: []
});

const DepartmentModel = mongoose.model('department', DepartmentSchema);
module.exports = DepartmentModel;
