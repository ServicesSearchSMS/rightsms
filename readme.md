# Prerequisites
Node, Homebrew, ngrok (for localhost tunneling)

```npm install -g yo```

```npm install -g bower```

```npm install -g gulp```

```npm install -g generator-express```

```brew cask install ngrok```

# Install
```$ bower install```
```$ npm i```

# Setup
For security during dev, store the sid and authtoken in your bash session
```$ export TWACCOUNTSID='<sid>'```
```$ export TWAUTHTOKEN='<authToken>'```

# Run
```$ ngrok http 80```
```$ gulp```

# Quickstart Guides
1. https://www.twilio.com/docs/quickstart/node/programmable-sms
2. https://www.twilio.com/docs/guides/sms/how-to-create-sms-conversations-in-node-js#using-http-cookies-with-webhooks 
3. https://www.twilio.com/docs/guides/sms/how-to-receive-and-reply-in-node-js#what-is-a-webhook
