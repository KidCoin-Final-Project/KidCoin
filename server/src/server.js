const express = require('express'); 
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes')

var cors = require('cors')
app.use(cors())

app.use('/',routes)
//start server on port: 8080
var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server listening at http://%s:%s", host, port);
});
