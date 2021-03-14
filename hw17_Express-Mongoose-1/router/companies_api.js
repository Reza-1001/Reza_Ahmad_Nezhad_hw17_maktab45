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
router.get("/all/1year", (req, res) => {
  CompanyLists.find({}, (err, companies) => {
    let newCompanies = []
    let yearNow = new Date().getFullYear();
    for (let i of companies) {
      if (yearNow - i.registrationDate.getFullYear() <= 1)
        newCompanies.push(i)
    }
    return res.render('./../views/pages/companies.ejs', {
      data: newCompanies
    })

  });
});


router.get("/all/companynames",(req,res)=>{
  CompanyLists.find({},{"name":1},(err,companies)=>{
    if (err) return res.status(500).send("Somthing went wrong! \n" + err);
    res.json(companies);
  })
})
router.put("/create", function (req, res) {
  Create(req)
  res.redirect(301, '/companies/all');
});
router.post('/create', function (req, res) {

  Create(req)
  res.redirect(301, '/companies/all');

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
  console.log(req.params.id)
  console.log(req.body);;
  CompanyLists.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
    res.redirect(301, '/companies/all');
  })
});
router.get("/update/changetotehran", (req, res) => {
  CompanyLists.updateMany({}, {
    $set: {
      city: "Tehran",
      state: "Tehran"
    }
  }, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
    res.redirect(301, '/companies/all');
  })
});

router.get('/all/ce',(req,res)=>{
  let data=[];
  CompanyLists.find({},(err,companies)=>{
    
    for (let i of companies){
      
      EmployeeList.find({"manager":{$eq:"Yes"},"companyId":{$eq:i._id}},(err,manager)=>{
        for(let j in manager){
        data.push([i.name,`${manager[j].firstName} ${manager[j].lastName}`])
        }
        console.log(data)
      })
    }
    res.json(data)
  })

  
})

router.get('/company/:id', (req, res) => {

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
    return company
  })
}
module.exports = router;