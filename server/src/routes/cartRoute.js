const express = require('express');
const router = express.Router();

const {
    addToCart,
    getCartItemsById,
    deleteCartItem,
    updateQuantityAndTotalPiceProductInCart,
    updateTotalPriceById,
} = require('../controllers/CartController');

router.post('/add-to-cart', addToCart);
router.get('/get-cart-items/:userId', getCartItemsById);
router.post(
    '/update-quantity-totalProduct-cart/:userId',
    updateQuantityAndTotalPiceProductInCart
);
router.delete('/delete-cart-item/:userId', deleteCartItem);
router.patch('/put-totalPrice-Cart/:cartId', updateTotalPriceById);
module.exports = router;
