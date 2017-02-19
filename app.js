// const accountSid = Secrets.TWACCOUNTSID;
// const authToken = Secrets.TWAUTHTOKEN;

// sid and authToken should be stroed in the bash session
// check readme
const accountSid = process.env.TWACCOUNTSID;
const authToken = process.env.TWAUTHTOKEN;

var http = require('http');
const twilio = require('twilio');
const express = require('express');
const urlencoded = require('body-parser').urlencoded;

const app = express();
app.use(urlencoded({
  extended: false
}));

// Create twilio client with credentials
const client = require('twilio')(accountSid, authToken);

app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});
