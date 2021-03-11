const mongoose = require("mongoose");
const Schema= mongoose.Schema;


const companySchema = new Schema({
  name: {
    type: String,
  },
  registrationNo: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  registrationDate: {
    type: Date,
  },
  tel: {
    type: Number,
  }
});

module.exports = mongoose.model("CompanyList", companySchema);
