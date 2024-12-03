const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            nameProduct: {
                type: String,
                required: true,
            },
            totalPriceProduct: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            colors: { type: [String], required: true },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
});

cartSchema.pre('save', async function (next) {
    const cart = this;
    cart.totalPrice = cart.products.reduce((acc, product) => {
        return acc + product.totalPriceProduct;
    }, 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
