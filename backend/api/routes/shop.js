const express = require('express');
const router = express.Router();

const ShopController = require('../controllers/shop.js');

// create a Shop
router.post('/add', ShopController.createShop);

// search by latitude and longitude
router.get('/search/:longitude&:latitude', ShopController.searchShop);

// search by latitude and longitude
router.get('/all', ShopController.getAllShops);

module.exports = router;