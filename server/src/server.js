const express = require('express'); 
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes')
const cors = require('cors')
const expressSwagger = require('express-swagger-generator')(app);

app.use(bodyParser.json())
app.use(cors())

let options = {
  swaggerDefinition: {
      info: {
          description: 'This is the api for kidcoin',
          title: 'KidCoin',
          version: '1.0.0',
      },
      produces: [
          "application/json",
          "application/xml"
      ],
      securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'authtoken',
            description: "",
        }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./api/*.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use('/',routes)
//start server on port: 8080
var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server listening at http://%s:%s", host, port);
});
