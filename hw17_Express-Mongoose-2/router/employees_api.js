const express = require("express");
const router = express.Router();
const CompanyLists = require("./../models/Companies");
const EmployeeList = require("../models/Employees");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));





router.put("/create", function(req, res) {
  Create2(req,res)
  });
router.post('/create',function(req, res) {
   Create2(req,res)
  });

  router.get('/delete:id',(req,res)=>{
    console.log(req.params.id)
    EmployeeList.findByIdAndDelete(req.params.id, function(err, obj) {
      if (err) throw err;
      // res.redirect(301, `/companies/company/${obj.companyId}`);
    });
    
  }) 
  router.put("/update/:id", (req, res) => {
  EmployeeList.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
        // res.redirect(301, '/employees/all');
         
    })
});
router.get('/employee/edit/:id', (req, res) => {
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
  // res.redirect(301, '/employees/all');
})
}
module.exports = router;
