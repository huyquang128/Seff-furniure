const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: [
        {
            firstName: { type: String },
            lastName: { type: String },
            phone: { type: String },
            detailed: { type: String },
            province: { type: String },
            district: { type: String },
            ward: { type: String },
        },
    ],
    role: {
        type: String,
        default: 'user',
    },
    urlImgAvatar: {
        type: String,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();

    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
