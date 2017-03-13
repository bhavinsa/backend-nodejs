var apns = require("apn");
var util = require('util');
var options;

if (PushEnvironment == "production") {
    options = {
        cert: basePath + "api/APNS/application.pem",
        key: basePath + "api/APNS/application.pem",
        production: true,
        port: 2195,
    };
} else {
    options = {
        cert: basePath + "api/APNS/application.pem",
        key: basePath + "api/APNS/application.pem",
        production: false,
        port: 2195,
    };
}

/*
 * Send notifiction to ios
 */
exports.sendNotification = function (count, message, sound, deviceToken, mixed, callback) {
    if (deviceToken !== undefined && deviceToken != null) {



        var connection = new apns.Connection(options);

        var notification = new apns.Notification();
        notification.expiry = Math.floor(Date.now() / 1000) + 3600;
        //notification.sound = "default";
        notification.alert = message;
        notification.badge = parseInt(count);

        if (utils.isDefined(mixed) && mixed != "") {
            notification.payload = data.mixed;
        }

        if (utils.isDefined(sound) && sound == 0) {
            delete notification.sound
        }

        if (util.isArray(deviceToken) && deviceToken.length > 0) {
            connection.pushNotification(notification, deviceToken);
        } else {
            notification.device = new apns.Device(data.deviceToken);
            connection.sendNotification(notification);
        }
        callback(null, true);
    } else {
        callback(null, false);
    }
};


/*
 * Send notifiction to ios multipal devices (with different message)
 */
exports.sendManyNotification = function (sound, notificationData, callback) {
    if (notificationData !== undefined && notificationData.length > 0) {

        var connection = new apns.Connection(options);

        notificationData.forEach(function (data, i) {
            if (data.device_token !== undefined && data.device_token != null) {
                var notification = new apns.Notification();
                notification.badge = data.badge;
                notification.sound = "default";
                notification.alert = data.message;

                if (data.mixed !== undefined && data.mixed != "") {
                    notification.payload = data.mixed;
                }

                if (data.sound !== undefined && data.sound == 0) {
                    delete notification.sound
                }

                connection.pushNotification(notification, data.device_token);
            }

        });

        callback(null, true);

    } else {
        callback(null, false);
        //        process.exit();
    }
};