const express = require('express')
const router = express.Router();


// importing shop controller 

const shopController = require('../controller/shop');

router.get('/' ,  shopController.getProducts) 

router.post('/cart' ,  shopController.addcart) 

router.get('/cart' ,  shopController.getcart) 

router.post('/cart-delete-item', shopController.postCartDeleteProduct);



module.exports = router