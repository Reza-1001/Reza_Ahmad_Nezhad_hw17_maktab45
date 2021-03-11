const express = require("express");
const router = express.Router();
const companiesRouter = require("./companies_api");
const employeesRouter = require("./employees_api");
const bodyParser = require('body-parser');


      
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/',(req,res)=>{
    res.render('./../views/pages/companies.ejs',{data:{}})
})
router.use("/companies", companiesRouter);

router.use("/employees", employeesRouter);

module.exports = router;
