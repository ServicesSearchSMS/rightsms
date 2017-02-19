// const accountSid = Secrets.TWACCOUNTSID;
// const authToken = Secrets.TWAUTHTOKEN;
// webhook server url is an ngrok tunnel
// sid and authToken should be stored in the bash session while developing. check readme

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

const dict = {
  en: {
    language: 'English or Espanol?',
    zipCode: 'What is your zipcode'
  },
  es: {
    language: 'What language?',
    zipCode: '¿Cuál es su código postal?'
  }
};

let postObj = {
  language: '',
  zicCode: ''
};

let ONE_DEGREE_ENDPOINT = 'http://whatever.it.is.com/api'

app.post('/', (req, res) => {
  const twiml = new twilio.TwimlResponse();

  twiml.message('English or Espanol?')

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/lang', (req, res) => {
  const twiml = new twilio.TwimlResponse();
  let lang = '';

  if (req.body.Body === 'Spanish') {
    lang = 'es';
    postObj.language = 'spanish';
  } else if (req.body.Body === 'English') {
    lang = 'en'
    postObj.language = 'english';
  }

  twiml.message(dict[lang].zipCode)

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/zip', (req, res) => {
  const twiml = new twilio.TwimlResponse();
  postObj.zipCode = parseInt(req.body.Body)

  fetch(ONE_DEGREE_ENDPOINT, {
    method: 'GET',
  })
  .then((response) => {

    // turn this response either into
    // a filtererable question / answer like before
    // or send the list of business names and phone numbers
    // prob will need to massage the data. a lot. heh.
    twiml.message(response);
  })

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
