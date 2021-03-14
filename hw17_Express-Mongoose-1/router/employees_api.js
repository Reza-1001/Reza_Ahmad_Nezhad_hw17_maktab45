const express = require("express");
const router = express.Router();
const CompanyLists = require("./../models/Companies");
const EmployeeList = require("../models/Employees");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.get("/all", (req, res) => {
    EmployeeList.find({}).populate('companyId',{name:1,_id:0}).exec((err, employees) => {
        return res.render('./../views/pages/employees.ejs',{data:employees})
      })
});
router.get("/all/manager", (req, res) => {
  EmployeeList.find({"manager":{$eq:"Yes"}}, (err, employees) => {
      return res.render('./../views/pages/employees.ejs',{data:employees})
    });
});

router.get("/all/employees", (req, res) => {
  EmployeeList.find({"manager":{$eq:"No"}}, (err, employees) => {
      return res.render('./../views/pages/employees.ejs',{data:employees})
    });
});
router.get("/tele/manager", (req, res) => {
  CompanyLists.findOne({"name":{$eq:"Tele"}},(err,id)=>{
    if (!id) return res.status(500).send("Company not found \n!" + err);
    EmployeeList.findOne({"companyId":{$eq:id._id},"manager":{$eq:"Yes"}},(err,manager)=>{
      if (err) return res.status(500).send("Company manager not found \n!" + err);
      console.log(manager)
      res.json(manager);
    })
  })
});

router.get("/tele/employees", (req, res) => {
  CompanyLists.findOne({"name":{$eq:"Tele"}},(err,id)=>{
    if (!id) return res.status(500).send("Company not found \n!" + err);
    EmployeeList.findOne({"companyId":{$ne:id._id},"manager":{$eq:"Yes"}},(err,employees)=>{
      if (err) return res.status(500).send("Company manager not found \n!" + err);
      console.log(employees)
      res.json(employees);
    })
  })
});


router.get("/all/agelimit", (req, res) => {
  EmployeeList.find({"age":{$gt:20},"age":{$lt: 30}}, (err, employees) => {
      return res.render('./../views/pages/employees.ejs',{data:employees})
    });
});
router.put("/create", function(req, res) {
  Create2(req,res)
  });
router.post('/create',function(req, res) {
   Create2(req,res)
  });

  router.get('/delete:id',(req,res)=>{

    EmployeeList.findByIdAndDelete(req.params.id, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
    });
    res.redirect(301, '/employees/all');
  })
  router.put("/update/:id", (req, res) => {
 console.log("***"+req.params.id);
 console.log(req.body);
  EmployeeList.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
        res.redirect(301, '/employees/all');
        
    })
});

router.get('/employee/:id', (req, res) => {
  console.log(req.params.id)
  EmployeeList.findOne({'_id': req.params.id}).populate('companyId',{name:1,_id:0}).exec((err, doc)=> {
      if (err) 
        throw new Error('No record found.');
      res.json(doc);
    });
})

function Create2(req,res){
  console.log(req.body);
  const NEW_EMPLOYEE = new EmployeeList(req.body)
NEW_EMPLOYEE.save(function(err, employee) {        
  if (err) return res.status(500).send("Somthing went wrong in add employee \n!" + err);
  res.redirect(301, '/employees/all');
})
}
module.exports = router;
