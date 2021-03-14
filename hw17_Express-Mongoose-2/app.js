const express = require("express");
const app = express();
const api = require("./router/api");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

app.use(express.static('public'))

mongoose.connect(
    'mongodb://localhost:27017/Companies'
, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use("/", api);

app.listen(5000, function () {
  console.log("Server is Running on 'localhost:5000'...");
});
