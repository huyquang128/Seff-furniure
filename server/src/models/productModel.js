const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: { type: String, required: true },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    sale: {
        type: Number,
        default: 0,
    },
    material: { type: String },
    size: {
        width: { type: String, required: true },
        height: { type: String, required: true },
        length: { type: String, required: true },
    },
    infoProduct: {
        detail_Product: { type: String },
        Essential_Information: { type: String },
        Safety_Standards: { type: String },
        Product_Features: { type: String },
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    parentMenu: { type: String, required: true },
    childMenu: { type: String, required: true },
    subChildMenu: { type: String, required: true },
    colors: [
        {
            colorId: { type: String }, // ID của màu
            images: [{ type: String }], // Mảng chứa URL ảnh
        },
    ],
});

// productSchema.pre('save', function (next) {
//     this.sale = sale || '';

//     next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
