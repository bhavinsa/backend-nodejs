var Product = require(basePath + 'models/product');
_ = require('lodash');
var utils = require(basePath + 'helper/utils');

var product = {
    create: function (req, res) {
        if (utils.isDefined(req.files)) {
                Sync(function () {
                var imageURL = '';
                userImageResult = utils.uploadUserImage.sync(null, req.files, req.body.id, config.PRODUCT_IMAGE_PATH);
                if (!utils.isDefined(userImageResult.error)) {
                    imageURL = userImageResult.fileName;
                } else {
                    imageError = userImageResult.error;
                }
                var data = {
                     name: req.body.name,
                     user_id: req.body.id,
                     description: req.body.description,
                     img_name: imageURL
                };    
                console.log(JSON.stringify(data));
                var product = new Product(data);
                product.save(function (err) {
                if (!validate.isEmpty(err)) {
                var message;
                if (!validate.isEmpty(err.code)) {
                    if(err.code == 11000) {
                        message = 'Product name already taken.';
                    }else if(err.code == 1122){
                        message = 'Product name already taken.';
                    }
                   
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
                product: product
            });
        });    
                    
        });
        }
    },
    getProducts: function(req, res) {
         Product.find({
            user_id: req.body._id
         }).
         exec(function(error, product){
          utils.sendResponse(res, {
                product: product
            });
        });
    },
     getProductDetails: function(req, res) {
         var data = {};
         Product.findOne({
            _id: req.body._id
         }).
         exec(function(error, product){
            if(!validate.isEmpty(product)){
                var data = {
                name: product.name,
                description: product.description,
                img_name: product.img_name,
                created: product.created.toString()
            }    
            }
            utils.sendResponse(res, {
                product: data
            });
       
          });
         
    }
};

module.exports = product;