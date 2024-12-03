const mongoose = require('mongoose');

const subChildMenuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const childMenuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    subChildren: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'SubChildMenu' },
    ],
});

const parentMenuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChildMenu' }],
});

const SubChildMenu = mongoose.model('SubChildMenu', subChildMenuSchema);
const ChildMenu = mongoose.model('ChildMenu', childMenuSchema);
const ParentMenu = mongoose.model('ParentMenu', parentMenuSchema);

module.exports = { SubChildMenu, ChildMenu, ParentMenu };
