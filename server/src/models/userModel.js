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
    address: {
        detailed: { type: String },
        province: { type: String },
        district: { type: String },
        ward: { type: String },
    },
    role: {
        type: String,
        default: 'user',
    },
    urlImgAvatar: {
        type: String,
    },
    reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' }],
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

    if (!this.reviewers || this.reviewers.length === 0) {
        this.reviewers = []; // Đặt mảng reviewers rỗng nếu chưa có
    }

    this.firstName = this.firstName || '';
    this.lastName = this.lastName || '';
    this.phone = this.phone || '';
    this.address = {
        detailed: this.address?.detailed || '',
        province: this.address?.province || '',
        district: this.address?.district || '',
        ward: this.address?.ward || '',
    };
    this.urlImgAvatar = this.urlImgAvatar || '';
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
