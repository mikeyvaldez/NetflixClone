// subscriptions logic
// connects to our index.js file
//------------------------------

// require express router
const router = require("express").Router();
const { stripe } = require("../utils/stripe");
// const checkAuth = require("../middleware");

// logic to fetch our products

router.get("/products", async (req, res) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
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
      },
    };
  });

  return res.json(products);
});

router.post("/session", async (req, res) => {
    const { priceId, email } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/browse",
      cancel_url: "http://localhost:5173/plans",
      customer_email: email,
    });
  
    return res.json(session);
  });

module.exports = router;