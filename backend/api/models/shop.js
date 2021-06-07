const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    latitude: {
        type: Number,
        default: 0.0
    },
    longitude: {
        type: Number,
        default: 0.0
    }
});


const shopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shopName: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    location: locationSchema
}, {
    timestamps: true
});

const shop = mongoose.model('Shop', shopSchema);

module.exports = shop;