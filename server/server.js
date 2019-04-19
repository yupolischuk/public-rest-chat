require('./config/config');
 
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
 
var {mongoose} = require('./db/mongoose');
var {Message} = require('./models/message');

 
var app = express();
const port = process.env.PORT;
 
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
/*
- The message must contain author(unauthenticated user) email and text, create date and update date.
- Email validation (regex to check if that is real email)
- Message validation (regex to check if message is not empty string, and length < 100)
{
  email
  text
  createdAt
  updatedAt
}
*/
 
// GET 
// /api/messages/list/0 will return first 10 messages
// /api/messages/list/1 will return second 10 messages
app.get('/messages/list/:skip', (req, res) => {
  let skip = req.params.skip * 10;
  Message
  .find({})
  .skip(skip)
  .limit(10)
  .then((messages) => { // todo переделать на 10
    res.send({messages});
  }, (e) => {
    res.status(400).send(e);
  });
});
 
// GET
// /api/messages/single/59f7303c2f60e5d7e6167dd1
app.get('/messages/single/:id', (req, res) => {
  Message.find({
    _id: req.params.id
  }).then((message) => {
    res.send(message);
  }, (e) => {
    res.status(400).send(e);
  })
});
 
// POST
// email text
app.post('/messages', (req, res) => {
  var message = new Message({
     text: req.body.text,
     email: req.body.email
  });
 
  message.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
})
 
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
 
module.exports = {app};
