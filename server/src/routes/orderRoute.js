const express = require('express');
const router = express.Router();

const {
    getAllOrder,
    addOrder,
    updateStatusOrder,
    deleteOrder,
    createQrOrderZalo,
    getOrders,
} = require('../controllers/OrderController');

router.get('/get-orders', getOrders);
router.get('/get-all-orders/:userId', getAllOrder);
router.post('/add-orders', addOrder);
router.patch('/update-order', updateStatusOrder);
router.delete('/delete-order/:orderId', deleteOrder);
router.post('/qr-code-zalo', createQrOrderZalo);

module.exports = router;
