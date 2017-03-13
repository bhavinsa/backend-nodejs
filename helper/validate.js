var _ = require('lodash');
var mongoose = require('mongoose');
module.exports = {
    isEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    isEmpty: function (mixedVar) {
        var undef, key, i, len;
        var emptyValues = [undef, null, false, 0, '', '0'];
        for (i = 0, len = emptyValues.length; i < len; i++) {
            if (mixedVar === emptyValues[i]) {
                return true;
            }
        }
        if (typeof mixedVar === 'object') {
            for (key in mixedVar) {
                return false;
            }
            return true;
        }

        return false;
    },
    range: function (mixedVar, start, end) {

        if (this.isEmpty(mixedVar)) {
            return false;
        }
        var len = mixedVar.length;
        return _.inRange(len, start, end);

    }, 
    isObjectId: function (objectId) {
        return mongoose.Types.ObjectId.isValid(objectId);
    }

}