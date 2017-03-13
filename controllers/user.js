var User = require(basePath + 'models/user');
_ = require('lodash');
var utils = require(basePath + 'helper/utils');

var user = {
    create: function (req, res) {
                if (utils.isDefined(req.files)) {
                Sync(function () {
                var imageURL = '';
                userImageResult = utils.uploadUserImage.sync(null, req.files, Math.floor((Math.random() * 100) + 1), config.USER_IMAGE_PATH);
                if (!utils.isDefined(userImageResult.error)) {
                    imageURL = userImageResult.fileName;
                } else {
                    imageError = userImageResult.error;
                }
                var hobbyTmp = {
                    "hobbyCricket": req.body.hobbyCricket,
                    "hobbyFootball": req.body.hobbyFootball,
                }
                var data = {
                     firstName: req.body.firstName,
                     email: req.body.email,
                     password: utils.encrypt(req.body.password),
                     birthDate: req.body.birthDate,
                     country: req.body.country,
                     gender: req.body.gender,
                     hobby:  hobbyTmp,
                     terms: req.body.terms,
                     imgName: imageURL,
                     is_deleted: false
                };   
                var user = new User(data);
                user.save(function (err) {
                if (!validate.isEmpty(err)) {
                var message;
                if (!validate.isEmpty(err.code)) {
                    
                } else if (!validate.isEmpty(err.errors.email)) {
                        message = err.errors.email.message
                } else {
                        message = 'Cannot save the Product.'
                }
                return utils.sendResponse(res, {
                    error : message 
                }, 500);
            }                         
            utils.sendResponse(res, {
                user: user
            });
        });    
        });
        }
    },
  update: function (req, res) {
        Sync(function () {
            var hobbyTmp = {
                    "hobbyCricket": req.body.hobbyCricket,
                    "hobbyFootball": req.body.hobbyFootball,
                   }
            var data = {
                     firstName: req.body.firstName,
                     email: req.body.email,
                     birthDate: req.body.birthDate,
                     country: req.body.country,
                     gender: req.body.gender,
                     hobby:  hobbyTmp,
                }; 

        if (utils.isDefined(req.files.image)) {
            var imageURL = '';
                userImageResult = utils.uploadUserImage.sync(null, req.files, Math.floor((Math.random() * 100) + 1), config.USER_IMAGE_PATH);
                if (!utils.isDefined(userImageResult.error)) {
                    imageURL = userImageResult.fileName;
                } else {
                    imageError = userImageResult.error;
                }
                //unliked older one
                fs.unlink(config.USER_IMAGE_PATH + req.body.oldimgName);
                data.imgName = imageURL;
        }
        User.update({
            _id: req.body._id
        }, {
            $set: data
        }, function (err) {
            if (!validate.isEmpty(err)) {
               if (err.code == 11000) {
                    return utils.sendResponse(res, {
                        message: 'Email address already in use.'
                    }, 500);
                } 
                else {
                    return utils.sendResponse(res, {
                        message: 'Cannot update the User details.'
                    }, 500);
                }
            }
            utils.sendResponse(res, {
                message: 'User updated.'
            });
        });
        });
    },
    getUsers: function(req, res) {
         var where = {};
         if (utils.isDefined(req.body._id)) {
             where = {
                 "is_deleted": false,
                 "_id":req.body._id
             }
         }else{
             where = {
                 "is_deleted": false,
             }
         }
         User.find(where).
         exec(function(error, data){
          utils.sendResponse(res, {
                data: data
            });
        });
    }, 
    delete: function(req, res) {
      User.update({
            _id: req.body._id
        }, {
            $set: { "is_deleted": true }
        }, function (err) {
            if (!validate.isEmpty(err)) {
                utils.sendResponse(res, {
                message: 'Something happen wrong.'
            });
            }else{
                utils.sendResponse(res, {
                message: 'Deleted Successfully.'
            });
            }
        });
    },
    authenticate : function(req, res) {
      User.findOne({
            username: req.body.username,
        }).
         exec(function(error, user){
          utils.sendResponse(res, {
                user: user
            });
        });
    },
    detail: function(req, res) {
         User.findOne({
            _id: req.body.id
         }).
         exec(function(error, user){
          utils.sendResponse(res, {
                user: user
            });
        });
    }
};

module.exports = user;