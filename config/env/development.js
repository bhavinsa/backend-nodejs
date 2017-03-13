'use strict';
module.exports = {
    dbOptions : {
              user: '',
              pass: ''
    },
    db: 'mongodb://127.0.0.1:27017/product',
    notification: "local",
    debug: true,
    aggregate: false,
    mongoose: {
        debug: false
    },
    hostname: "http://127.0.0.1:3500/",
    app: {
        name: 'API'
    },
    emailFrom: 'test@example.com',
//    mailer: {
//        service: 'SERVICE_PROVIDER', // Gmail, SMTP
//        auth: {
//            user: 'EMAIL_ID',
//            pass: 'PASSWORD'
//        }
//    },
    CRYPTO_ALGORITHM : "aes-256-ctr",
    CRYPTO_PASSWORD : "tuysdy2782tyaxcvxcvsfgVAfg",
    USER_IMAGE_PATH : basePath + "public/user_images/",
    PRODUCT_IMAGE_PATH : basePath + "public/product_images/",
    secret: '12@sa#^5sd34sdf989dkhk21weqksdf{23}{2eghvasaxfj'
};