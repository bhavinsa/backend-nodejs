var jwt = require(basePath + 'helper/jwt');
var User = require(basePath + 'models/user');

//module.exports = function () {
//        return {
//            requiresLogin: function(req, res, next) {
//
//                 var token = (req.headers && req.headers['X-Auth-Token']);
//
//                  if (!utils.isDefined(token)) {
//                    return utils.sendResponse(res, 'User is not authorized', 401);
//                  }
//
//                  next();
//            },
//
//            isVaidUser: function(req, res, next) {
//
//                 var token = (req.headers && req.headers['X-Auth-Token']);
//                 var userID = jwt.getUserId(token);
//
//                 User.load(userID,function(err, user) {
//
//                     if(utils.isDefined(err) || !utils.isDefined(user)) {
//                        return utils.sendResponse(res, 'User is not authorized', 401);
//                     }
//                      next();
//
//                 });
//            }
//    };
//};


var auth = {
    requiresLogin: function(req, res, next) {

        var token = (req.headers && req.headers['X-Auth-Token']);

        if (validate.isEmpty(token)) {
            return utils.sendResponse(res, 'User is not authorized', 401);
        }

        next();
    },

    isVaidUser: function(req, res, next) {

         var token = (req.headers && req.headers['X-Auth-Token']);
         var userID = jwt.getUserId(token);

         User.load(userID,function(err, user) {
             if(!validate.isEmpty(err) || validate.isEmpty(user)) {
                return utils.sendResponse(res, 'User is not authorized', 401);
             }
             next();
         });
    }
};

module.exports = auth;