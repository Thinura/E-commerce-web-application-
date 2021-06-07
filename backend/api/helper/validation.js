const Shop = require('../models/shop');

exports.isShopNameAvailable = async (name) => {
    const result = await Shop.findOne({ shopName: name })
        .exec()
        .then((shop) => {
            if (shop != null)
                return true
            return false
        })
        .catch(error => {
            console.log(error);
            return error
        });
    console.log("isShopNameAvailable ", result)
    return result
}