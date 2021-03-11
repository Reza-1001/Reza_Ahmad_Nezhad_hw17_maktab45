const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  nationalId: {
    type: Number,
  },
  gender: {
    type: String,
    required:true,
    enum: ['male', 'female']
  },
  manager: {
    type: String,
    required:true,
    enum: ['Yes', 'No']
  },
  dateOfBirth: {
    type: Date,
  }
});

module.exports = mongoose.model("EmployeeList", employeeSchema);
