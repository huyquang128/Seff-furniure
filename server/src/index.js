const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/authRoute');
const menuRouter = require('./routes/menuRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const reviewRouter = require('./routes/reviewRoute');
const favoriteRouter = require('./routes/favoriteRoute');
const blogRouter = require('./routes/blogRoute');

dotenv.config();

const app = express();
const PORT = 3000;

const allowedOriginServerPairs = {
    'http://192.168.1.193:5173': 'http://localhost:3000',
    'http://localhost:5173': 'http://localhost:3000',
    'http://172.20.10.3:5173': 'http://localhost:3000',
};

app.use(
    cors({
        // origin: ['http://192.168.1.193:5173', 'http://localhost:5173'],
        origin: function (origin, callback) {
            // Kiểm tra nếu không có origin (ví dụ từ curl hoặc các công cụ tương tự)
            if (!origin) return callback(null, true);

            // Kiểm tra nếu origin có trong danh sách các cặp được cho phép
            if (allowedOriginServerPairs[origin]) {
                return callback(null, true);
            }

            // Nếu origin không hợp lệ, trả về lỗi
            callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/auth', authRouter);
app.use('', menuRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);
app.use('/favorite', favoriteRouter);
app.use('/blog', blogRouter);
app.use('/user', (req, res) => {
    res.json({ message: 'User route' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
