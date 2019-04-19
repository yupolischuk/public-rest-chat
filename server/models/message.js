var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    trim: true
  },
  createdAt: { 
    type : Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: null
  }
    // _creator: {
    // type: mongoose.Schema.Types.ObjectId,
    // required: true
    // }
});

function isEmail(v) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(v);
}

module.exports = {Message};