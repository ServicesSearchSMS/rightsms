// const accountSid = Secrets.TWACCOUNTSID;
// const authToken = Secrets.TWAUTHTOKEN;

const twilio = require('twilio');
const express = require('express');
const urlencoded = require('body-parser').urlencoded;

const app = express();
app.use(urlencoded({
  extended: false
}));

// Create twilio client with credentials
const client = require('twilio')(accountSid, authToken);
