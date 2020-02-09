/**
 * Old mockup server.js
 * If you want to rollback, replace the server.js with this file
 * Scott
 */
var express        = require('express');
var http           = require('http');
var path           = require('path');
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var cors           = require('cors');

var fs             = require('fs');
var errorhandler   = require('errorhandler');
var mockApi        = require('./api-handlers/api');
var apiOverride    = require('./api-handlers/api-override');
var saveProfile    = require('./api-handlers/save-profile');

var mongoose       = require('mongoose');
var config         = require('./DB');

const eventRoute = require('./routes/event.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app           = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/event', eventRoute);

const port = process.env.PORT || 3001;

app.set('port', port);

app.use(morgan('dev'));





app.all('/', function (req, res) { res.sendFile(path.join(__dirname, 'welcome.html')); });

app.route('/eo/investing/V1/applicationData/profile')
   .get(function(req, res) {
     console.log('1. Requested file is: ' + path.join(__dirname, 'mock-data', 'v1', 'applicationData', 'profile0_GET.json'));
     res.sendFile(path.join(__dirname, 'mock-data', 'v1', 'applicationData', 'profile0_GET.json'));
   });

app.route('/eo/investing/V1/applicationData/profile/:id')
   .get(function(req, res) {
     console.log('>>>> 2. Dispatch file : ' + req.filePath);
     res.sendFile(req.filePath);
   });
app.param('id', function(req, res, next, id){
  console.log('>>>> app.param is called : ' + 'profile' + id.toString() + '_GET.json');
  req.filePath = path.join(__dirname, 'mock-data', 'v1', 'applicationData', 'profile' + id.toString() + '_GET.json');
  next();
});


app.route('/eo/investing/V1/applicationData/review')
   .get(function(req, res) {
     console.log('2. Requested file is: ' + path.join(__dirname, 'mock-data', 'v1', 'applicationData', 'review_GET.json'));
     res.sendFile(path.join(__dirname, 'mock-data', 'v1', 'applicationData', 'review_GET.json'));
   });

app.route('/eo/investing/V1/applicationData/review/:id')
   .get(function(req, res) {
     console.log('>>>> 3. Dispatch file : ' + req.filePath);
     res.sendFile(req.filePath);
   });
app.param('id', function(req, res, next, id){
  console.log('>>>> app.param is called : ' + 'profile' + id.toString() + '_GET.json');
  req.filePath = path.join(__dirname, 'mock-data', 'v1', 'applicationData', 'profile' + id.toString() + '_GET.json');
  next();
});

app.use('/eo/investing/disclosure/rest/disclosure/getConsolidatedDisclosuresByProducts', 
    (req, res) => { res.sendFile(path.join(__dirname, 'mock-data', 'v1', 'disclosure', 'getConsolidatedDisclosuresByProducts_POST.json')); });

app.use('/eo/investing', express.static(path.join(__dirname, '..', 'webapp')));

app.use('/eo/investing/login', apiOverride(path.join(__dirname, 'mock-data', 'v1')));

app.use('/eo/investing/login', mockApi(path.join(__dirname, 'mock-data', 'v1')));

app.post('/eo/investing/v1/applicationData/profile/:eventId/:state',
   saveProfile(path.join(__dirname, 'mock-data', 'v1'))
);

app.post('/eo/investing/v1/applicationData/product/:productType/:state', saveProfile(path.join(__dirname, 'mock-data', 'v1')));

[
  '/eo/investing',
  '/td-eso-core-login-app',
  '/disclosure',
  '/td-eso-identity-proofing-app'
].forEach(function (url) {
    app.use(url, apiOverride(path.join(__dirname, 'mock-data')));
    app.use(url, mockApi(path.join(__dirname, 'mock-data')));
});


if ('development' === app.get('env')) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log(`com.td.dcts.esoWealthExperience server listening @ localhost:${app.get('port')}`);
});

// const server = app.listen(function(){
//   console.log('com.td.dcts.esoWealthExperience server listening @ localhost: on port ' + port);
// });


