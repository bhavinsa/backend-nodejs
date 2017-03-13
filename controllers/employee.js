var mongoose = require('mongoose');
var _ = require('lodash');
var utils = require(basePath + 'helper/utils');
var employee = require(basePath + 'models/employee');

var emp = {
    addEmployee: function (req, res) {
        var emp = new employee(req.body);
        emp.save(function (err) {
            var message;
            if (!validate.isEmpty(err)) {
                if (!validate.isEmpty(err.code)) {
                    if (err.code == 11000) {
                        message = 'Username already taken';
                    } else if (err.code == 1122) {
                        message = 'Username already taken';
                    }
                } else if (!validate.isEmpty(err.errors.email)) {
                    message = err.errors.email.message
                } else {
                    message = err.message
                }
                return utils.sendResponse(res, {
                    error: message
                }, 500);
            }
            utils.sendResponse(res, {
                data: emp
            });
        });
    },

    getEmployee: function (req, res) {
        mongoose.model('employee').find({}).exec(function (error, emp) {
            utils.sendResponse(res, {
                emp: emp
            });
        });
    },


    getEmployeeById: function (req, res) {
        employee.findOne({
            _id: req.body.id
        }).exec(function (error, emp) {
            console.log(emp.dateLocal);
            utils.sendResponse(res, {
                emp: emp
            });
        });
    },

    deleteEmployee: function (req, res) {
        employee.find({ _id: req.body.id }).remove().exec(function (err, data) {
            utils.sendResponse(res, {
                data: data,
                err: err
            });
        });
    }
};

module.exports = emp;