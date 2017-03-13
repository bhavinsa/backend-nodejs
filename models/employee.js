var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('lodash');

var validateUniqueEmail = function (value, callback) {
    var employee = mongoose.model('employee');
    employee.find({
        $and: [{
            email: value
        }, {
            _id: {
                $ne: this._id
            }
        }]
    }, function (err, user) {
        callback(err || user.length === 0);
    });
};


/**
 * Getter
 */
var escapeProperty = function (value) {
    return _.escape(value);
};

var EmpSchema = new Schema({
    emailId: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
        validate: [validateUniqueEmail, 'E-mail address is already in-use']
    },
    name: {
        type: String,
        unique: true,
        required: true,
        get: escapeProperty
    },
    department: {
        type: String,
        enum: ['ACCOUNT', 'DEVELOPEMENT', 'QA', 'HR', 'ADMIN']
    },
    designation: {
        type: String,
        enum: ['CTO', 'COO', 'MD', 'M', 'SSE', 'SE']
    },
    salary: {
        type: Number,
        require: true
    },
    joinDate: {
        type: Date
    },
    empImg: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
});

EmpSchema.virtual('dateLocal').get(function () {
    return this.created.toString();
});

EmpSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated = currentDate;
    if (!this.joinDate)
        this.joinDate = currentDate;
    next();
});

var employee = mongoose.model('employee', EmpSchema);
module.exports = employee;
