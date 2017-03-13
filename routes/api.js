//Dependencies 
var express = require('express');
var router = express.Router();
var user = require(basePath + 'controllers/user');
var product = require(basePath + 'controllers/product');
var auth = require(basePath + 'helper/auth');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//router.param('id', user.user);
router.route('/authenticate').post(user.authenticate);
router.route('/user').post(multipartMiddleware ,user.create);
router.route('/user/getUsers').post(user.getUsers);
router.route('/user/delete').post(user.delete);
router.route('/user/update').post(multipartMiddleware, user.update);
router.route('/user/detail').post(user.detail);

//Product
router.route('/product').post(multipartMiddleware ,product.create);
router.route('/product/getProducts').post(product.getProducts);
router.route('/product/getProductDetails').post(product.getProductDetails);

//router.post('/product', multipartMiddleware, product.create); //Create new user
module.exports = router;