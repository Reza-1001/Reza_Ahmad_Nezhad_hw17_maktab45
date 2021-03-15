const express = require("express");
const router = express.Router();
const CompanyLists = require("./../models/Companies");
const EmployeeList = require("../models/Employees");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: true
}));

router.get("/all", (req, res) => {
    CompanyLists.find({}, (err, companies) => {
      return res.render('./../views/pages/companies.ejs', {
        data: companies
      })
    });
});

router.put("/create", function (req, res) {
  Create(req)
});
router.post('/create', function (req, res) {
  Create(req)
});

router.get('/delete:id', (req, res) => {
  console.log(req.params.id);
  CompanyLists.findByIdAndDelete(req.params.id, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
  res.redirect(301, '/companies/all');
})

router.put("/update/:id", (req, res) => {

  CompanyLists.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
    res.redirect(301, '/companies/all');
  })
});

router.get('/filterbydate/',(req,res)=>{
  // console.log(req.query.fromDate);
  // console.log(req.query.toDate);
  CompanyLists.find({ registrationDate: {$gte: new Date(req.query.fromDate), $lt: new Date(req.query.toDate)}},(err,companies)=>{
    return res.render('./../views/pages/companies.ejs', {
      data: companies
    })
  })
}) 
    

router.get('/company/:id', (req, res) => {
  CompanyLists.findOne({'_id': req.params.id}).then(function (company) {
      if (!company)
        throw new Error('No record found.');
        else{
          EmployeeList.findOne({'companyId': {$eq:req.params.id}, "manager":{$eq:"Yes"}},(err,manager)=>{
            EmployeeList.find({'companyId': {$eq:req.params.id}, "manager":{$eq:"No"}},(err,employees)=>{
              // console.log("**************")
              // console.log(employees)
              if (err) return res.status(500).send("no Employee found! \n" + err);
            res.render('./../views/pages/company.ejs',{data:company, manager:manager,employees:employees});
            })
          })
           
        }
      
    });
})

router.get('/company/edit/:id', (req, res) => {

  CompanyLists.findOne({
      '_id': req.params.id
    })
    .then(function (doc) {
      if (!doc)
        throw new Error('No record found.');
      res.json(doc);
    });
})

function Create(req) {
  const NEW_COMPANY = new CompanyLists({
    name: req.body.name,
    registrationNo: req.body.registrationNo,
    city: req.body.city,
    state: req.body.state,
    registrationDate: new Date(req.body.registrationDate),
    tel: req.body.tel,
  })
  console.log(NEW_COMPANY);
  NEW_COMPANY.save(function (err, company) {
    if (err) return res.status(500).send("Somthing went wrong in add company \n!" + err);
    res.redirect(301, '/companies/all');
  })
}
module.exports = router;