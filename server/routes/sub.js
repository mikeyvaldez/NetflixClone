// subscriptions logic
// connects to our index.js file
//------------------------------

// require express router
const router = require("express").Router()
const { stripe } = require("../utils/stripe");


// logic to fetch our products
router.get("/products", async (req, res) => {
    const response = await stripe.products.list({        
        expand: ["data.default_price"]
    });

    const products = response.data.map(({ id, name, default_price }) => {
        return {
            id,
            name,
            canDownload: true,
            canWatchTPB: name === "Premium Plan" ? true : false,
            price: {
                amount: default_price.unit_amount,
                id: default_price.id,
            }
        }
    })

    return res.json(products);
})

module.exports = router;