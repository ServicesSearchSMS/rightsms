// const accountSid = Secrets.TWACCOUNTSID;
// const authToken = Secrets.TWAUTHTOKEN;
// webhook server url is an ngrok tunnel
// sid and authToken should be stored in the bash session while developing. check readme

const accountSid = process.env.TWACCOUNTSID;
const authToken = process.env.TWAUTHTOKEN;
const sessionSecret = process.env.COOKIESECRET;
//(347) 321-9435

var http = require('http');
var util = require('util');
const twilio = require('twilio');
const express = require('express');
const session = require('express-session');
const urlencoded = require('body-parser').urlencoded;

const app = express();
app.use(session({ secret: sessionSecret }));
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
  console.log(util.inspect(req));
  let smsCount = req.session.counter || 0;
  const twiml = new twilio.TwimlResponse();

  switch (smsCount) {
    case 0:
      wiml.message('English or Espanol?');
      break;
    case 1:
      let lang = '';

      if (req.body.Body === 'Spanish') {
        lang = 'es';
        postObj.language = 'spanish';
      } else {
        lang = 'en'
        postObj.language = 'english';
      }

      twiml.message(dict[lang].zipCode);
      break;
    default:
      wiml.message('English or Espanol?');
  }
  
  req.session.counter = smsCount + 1;
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/lang', twilio.webhook({validate: false}), (req, res) => {
  console.log(util.inspect(req));
  const twiml = new twilio.TwimlResponse();
  let lang = '';

  if (req.body.Body === 'Spanish') {
    lang = 'es';
    postObj.language = 'spanish';
  } else {
    lang = 'en'
    postObj.language = 'english';
  }

  twiml.message(dict[lang].zipCode);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/zip', (req, res) => {
  console.log(util.inspect(req));
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

app.get('/', (req, res) => {
  console.log(util.inspect(req));
  res.send(200);
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

module.exports = app;