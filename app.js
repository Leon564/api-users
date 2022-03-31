const express = require("express")

const app = express();
const api = require('./routes')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', function (req, res) { res.send('home') });


app.use('/api', api)



module.exports = app;
