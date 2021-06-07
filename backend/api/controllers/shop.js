const mongoose = require('mongoose');
const { isShopNameAvailable } = require('../helper/validation');
const Shop = require('../models/shop');

exports.createShop = async (req, res, next) => {
    const shopName = req.body.shopName;
    const cityName = req.body.cityName;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const checkShopName = await isShopNameAvailable(shopName);

    if (!checkShopName) {
        const shop = new Shop({
            _id: new mongoose.Types.ObjectId(),
            shopName: shopName,
            cityName: cityName,
            location: {
                latitude: latitude,
                longitude: longitude
            }
        });

        shop
            .save()
            .then(result => {
                console.log("Created a shop ", result);
                res.status(201).json({
                    message: "Shop created",
                    createdPost: {
                        id: result.id,
                        shopName: result.shopName,
                        cityName: result.cityName,
                        location: {
                            latitude: result.location.latitude,
                            longitude: result.location.longitude
                        }
                    }
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });
    } else {
        console.log("Already in the database ", shopName);
        res.status(200).json({
            count: 1,
            message: "Shop is already registered."
        });
    }
};

exports.searchShop = (req, res, next) => {
    const longitude = req.params.longitude;
    const latitude = req.params.latitude;
    console.log("longitude", longitude)
    console.log("latitude", latitude)
    Shop.find({ "location.latitude": latitude, "location.longitude": longitude })
        .exec()
        .then((result) => {
            console.log("result", result)
            if (result.length != 0) {
                const response = result.map(shop => {
                    return {
                        id: shop.id,
                        shopName: shop.shopName,
                        cityName: shop.cityName,
                        location: {
                            latitude: shop.location.latitude,
                            longitude: shop.location.longitude
                        }
                    }
                })

                res.status(200).json({
                    count: result.length,
                    message: "Available shops",
                    shops: response
                });
            } else {
                res.status(200).json({
                    count: result.length,
                    message: "No shop available for this location."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

exports.getAllShops = (req, res, next) => {
    Shop.find()
        .exec()
        .then((result) => {
            if (result.length != 0) {
                const response = result.map(shop => {
                    return {
                        id: shop.id,
                        shopName: shop.shopName,
                        cityName: shop.cityName,
                        location: {
                            latitude: shop.location.latitude,
                            longitude: shop.location.longitude
                        }
                    }
                })

                res.status(200).json({
                    count: result.length,
                    message: "Available shops",
                    shops: response
                });
            } else {
                res.status(200).json({
                    count: result.length,
                    message: "No shop available for this location."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};