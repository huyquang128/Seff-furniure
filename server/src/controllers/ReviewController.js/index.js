const Review = require('../../models/reviewsModel');
const { Product } = require('../../models/productModel');
const User = require('../../models/userModel');

const getReviewsFromProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ productId });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};
const postReviews = async (req, res) => {
    const { userId, productId, comment, rating, author } = req.body;
    console.log(
        '🚀 ~ postReviews ~ userId, productId, comment, rating, author:',
        userId,
        productId,
        comment,
        rating,
        author
    );
    try {
        const newReview = await Review.findOneAndUpdate(
            { userId, productId },
            { $set: { comment, author, rating } },
            { new: true, upsert: true } // upsert tạo mới nếu không tìm thấy
        );

        // Hàm cập nhật User và Product
        const updateUserAndProduct = async (Model, modelId, reviewId) => {
            await Model.findByIdAndUpdate(
                modelId,
                { $addToSet: { reviewers: reviewId } }, // $addToSet tránh trùng lặp reviewId
                { new: true }
            );
        };

        await updateUserAndProduct(User, userId, newReview._id);
        await updateUserAndProduct(Product, productId, newReview._id);

        res.status(200).json({
            success: true,
            message: 'Post review successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = { postReviews, getReviewsFromProductById };
