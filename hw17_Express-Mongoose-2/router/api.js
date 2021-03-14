const express = require("express");
const router = express.Router();
const companiesRouter = require("./companies_api");
const employeesRouter = require("./employees_api");
const bodyParser = require('body-parser');


      
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/',(req,res)=>{
    res.redirect(301, '/companies/all');
})
router.use("/companies", companiesRouter);

router.use("/employees", employeesRouter);

module.exports = router;
