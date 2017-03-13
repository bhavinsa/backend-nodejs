var jwt = require('jwt-simple');

module.exports = function () {
        return {
            /*
             * For Create Secret Token For User
             * @param Int uid Uid
             * @return String
             */
            createSecretToken : function(uid){
                var token = jwt.encode({'uid':uid}, config.secret);
                return token;
            },

            /*
             * For Get User ID Form SecretToken
             * @param Int uid Uid
             * @return String
             */

            getUserId:function(token){
                var userID = "";
                if(token) {
                    try {
                        var decoded = jwt.decode(token, config.secret);
                        userID = decoded.uid;
                     }catch (err) {
                         userID
                     }
                }
                return userID;
            }

        }
}

