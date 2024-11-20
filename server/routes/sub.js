// subscriptions logic
// connects to our index.js file
//------------------------------

// require express router
const router = require("express").Router()
const { stripe } = require("../utils/stripe");


// logic to fetch our products
router.get("/products", async (req, res) => {
    const response = await stripe.products.list({
        apiKey: process.env.STRIPE_SECRET_KEY,
    });

    return res.json(response.data);
})

module.exports = router;