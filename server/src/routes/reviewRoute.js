const express = require('express');
const {
    postReviews,
    getReviewsFromProductById,
} = require('../controllers/ReviewController.js');
const router = express.Router();

router.post('/post-reviews', postReviews);
router.get('/get-reviews-from-product/:productId', getReviewsFromProductById);

module.exports = router;
