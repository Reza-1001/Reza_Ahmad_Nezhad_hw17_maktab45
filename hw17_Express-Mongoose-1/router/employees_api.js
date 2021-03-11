const express = require("express");
const router = express.Router();
const CompanyLists = require("./../models/Companies");
const EmployeeList = require("../models/Employees");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.get("/all", (req, res) => {
    EmployeeList.find({}, (err, employees) => {
        return res.render('./../views/pages/employees.ejs',{data:employees})
      });
});
router.get("/all/manager", (req, res) => {
  EmployeeList.find({"manager":{$eq:"Yes"}}, (err, employees) => {
      return res.render('./../views/pages/employees.ejs',{data:employees})
    });
});
router.get("/all/agelimit", (req, res) => {
  EmployeeList.find({"age":{$gt:20},"age":{$lt: 30}}, (err, employees) => {
      return res.render('./../views/pages/employees.ejs',{data:employees})
    });
});
router.put("/create", function(req, res) {
  Create2(req)
  res.redirect(301, '/employees/all');
  });
router.post('/create',function(req, res) {
 console.log(req.body);
   Create2(req)
   res.redirect(301, '/employees/all');
  
  });

  router.get('/delete:id',(req,res)=>{

    EmployeeList.findByIdAndDelete(req.params.id, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
    });
    res.redirect(301, '/employees/all');
  })
  router.put("/update/:id", (req, res) => {
 
  EmployeeList.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
  
        if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
        res.redirect(301, '/employees/all');
        
    })
});

function Create2(req){
  const NEW_EMPLOYEE = new EmployeeList(req.body)

NEW_EMPLOYEE.save(function(err, employee) {        
  if (err) return res.status(500).send("Somthing went wrong in add employee \n!" + err);
    return employee
})
}
module.exports = router;
