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
    enum: ['Male', 'Female']
  },
  manager: {
    type: String,
    required:true,
    enum: ['Yes', 'No']
  },
  companyId:{
    type:Schema.Types.ObjectId,
    ref:'CompanyList',
    required:true,
  }, 
  dateOfBirth: {
    type: Date,
  }
});

module.exports = mongoose.model("EmployeeList", employeeSchema);
