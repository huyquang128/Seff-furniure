const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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
            quantity: {
                type: Number,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingAddress: {
        detailedAddress: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing',
    },
    paymentMethod: {
        type: String,
        enum: [
            'cash_on_delivery',
            'vi_momo',
            'vt_money',
            'zalopay',
            'atm_banking',
            'visa',
        ],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

OrderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
