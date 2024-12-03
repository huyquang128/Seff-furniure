const express = require('express');
const router = express.Router();

const {
    addFavoriteProduct,
    getFavoriteProduct,
    deleteFavoriteProduct,
} = require('../controllers/FavoriteController');

router.post('/add-product-favorite', addFavoriteProduct);
router.get('/get-favorite-product/:userId', getFavoriteProduct);
router.delete('/delete-favorite-product', deleteFavoriteProduct);

module.exports = router;
