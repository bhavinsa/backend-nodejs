var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
       _ = require('lodash');

var validateUniqueEmail = function(value, callback) {
  var User = mongoose.model('User');
  User.find({
    $and: [{
      email: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, user) {
    callback(err || user.length === 0);
  });
};


/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

var UserSchema = new Schema({
    firstName: {
      type: String,
      require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    password: {
        type: String
    },
    birthDate:{
      type: Date
    },
    country:{
      type: String
    },
    gender:{
      type: String
    },
    hobby :{
      type: Object
    },
    terms: {
      type: Boolean
    },
    imgName:{
      type: String
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    is_deleted:{
      type: Boolean
    }
});

UserSchema.virtual('dateLocal').get(function() {
    return this.date.toString();
});

UserSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated = currentDate;
    if (!this.created)
        this.created = currentDate;
    next();
});

var user = mongoose.model('User', UserSchema);
module.exports = user;
