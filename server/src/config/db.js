const mongoose = require('mongoose');

const connectDB = async () => {
    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connect successfully!!!');
    } catch (error) {
        console.error('MongoDB connect false..');
    }
};

module.exports = connectDB;
