const express = require('express'); 
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes')
const cors = require('cors')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(bodyParser.json())
app.use(cors())


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "kidcoin API",
        description: "kidcoin API Information"
      }
    },
    // ['.routes/*.js']
    apis: ['../routes.js']
  };

app.use('/',routes)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//start server on port: 8080
var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server listening at http://%s:%s", host, port);
});
