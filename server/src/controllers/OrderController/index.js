const { ObjectId } = require('mongodb');
const User = require('../../models/userModel');
const Order = require('../../models/orderModel');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const { v1: uuidv1 } = require('uuid');
const moment = require('moment');
const { default: mongoose } = require('mongoose');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const getAllOrder = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const addOrder = async (req, res) => {
    const {
        userId,
        totalPrice,
        detailedAddress,
        province,
        district,
        ward,
        status,
        paymentMethod,
        fullname,
        phone,
    } = req.body;

    const products = JSON.parse(req.body.products);
    try {
        const productsArr = Array.isArray(products) ? products : [products];
        const checkUserId = await User.findOne({ _id: new ObjectId(userId) });

        if (!checkUserId) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found!' });
        } else {
            await User.updateOne(
                { _id: new ObjectId(userId) },
                {
                    $set: {
                        fullname,
                        phone,
                        shippingAddress: {
                            detailedAddress,
                            province,
                            district,
                            ward,
                        },
                    },
                }
            );

            const newOrder = new Order({
                userId,
                products: productsArr,
                fullname,
                totalPrice,
                shippingAddress: {
                    detailedAddress,
                    province,
                    district,
                    ward,
                },
                status,
                paymentMethod,
            });

            await newOrder.save();
            res.json({ success: true, message: 'Đã đặt đơn hàng thành công!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const updateStatusOrder = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json({
            success: true,
            message: 'Cập nhật trạng thái đơn hàng thành công!',
            data: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const orderIds = Array.isArray(orderId) ? orderId : [orderId];
        const convertObjectId = orderIds.map(
            (id) => new mongoose.Types.ObjectId(id)
        );
        await Order.deleteMany({
            _id: { $in: convertObjectId },
        });
        res.json({
            success: true,
            message: 'Xóa đơn hàng thành công!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const createQrOrderZalo = async (req, res) => {
    const { fullname, totalProductInCart } = req.body;
    const products = JSON.parse(req.body.products);

    try {
        const config = {
            appid: '553',
            key1: '9phuAOYhan4urywHTh0ndEXiV3pKHr5Q',
            key2: 'Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3',
            endpoint: 'https://sandbox.zalopay.com.vn/v001/tpe/createorder',
        };
        const newProducts = Array.isArray(products) ? products : [products];

        // embed data : userId, order id, note customer, discount code, branch code,...
        const embeddata = {
            merchantinfo: 'Shop HOMECOR',
        };

        const items = newProducts;

        const order = {
            appid: config.appid,
            apptransid: `${moment().format('YYMMDD')}_${uuidv1()}`, // mã giao dich có định dạng yyMMdd_xxxx
            appuser: fullname,
            apptime: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embeddata: JSON.stringify(embeddata),
            amount: totalProductInCart,
            description: 'Đơn hàng từ HOMECOR',
            bankcode: 'zalopayapp',
        };

        const data =
            config.appid +
            '|' +
            order.apptransid +
            '|' +
            order.appuser +
            '|' +
            order.amount +
            '|' +
            order.apptime +
            '|' +
            order.embeddata +
            '|' +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const result = await axios.post(config.endpoint, null, {
            params: order,
        });
        res.status(200).json({
            success: true,
            message: 'Tạo QR code thành công!',
            data: result.data,
        });
    } catch (error) {
        console.log('🚀 ~ addQrOrder ~ error:', error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    getAllOrder,
    addOrder,
    updateStatusOrder,
    deleteOrder,
    createQrOrderZalo,
    getOrders,
};
