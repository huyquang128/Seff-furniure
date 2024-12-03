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
        const checkUser = await Review.findOne({ userId, productId });

        let newReview = null;
        if (checkUser) {
            newReview = await Review.findOneAndUpdate(
                { userId, productId },
                { $set: { comment, author, rating } },
                { new: true }
            );
        } else {
            newReview = new Review({
                userId,
                productId,
                comment,
                rating,
                author,
            });

            await newReview.save();
        }

        const updateUserAndProduct = async (Model, idField, reviewId) => {
            await Model.findByIdAndUpdate(
                idField,
                { $push: { reviewers: reviewId } },
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
