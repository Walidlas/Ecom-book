const express = require("express");

const { userById } = require("../middlewares/user");

const { requireSingnIn, isAuth } = require("../middlewares/auth");

const { generateToken, processPayment } = require('./../controllers/braintreeController')

const router = express.Router();

router.get("/getToken/:userId", [requireSingnIn, isAuth], generateToken)
router.post("/purchase/:userId", [requireSingnIn, isAuth], processPayment)

router.param("userId", userById);

module.exports = router;
