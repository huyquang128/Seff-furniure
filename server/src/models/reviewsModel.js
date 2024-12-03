const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    author: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

reviewsSchema.pre('save', function (next) {
    this.author = this.author || '';

    next();
});

const Reviews = mongoose.model('Review', reviewsSchema);
module.exports = Reviews;
