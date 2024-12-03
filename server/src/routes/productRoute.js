const express = require('express');
const router = express.Router();

const {
    getALLProduct,
    addProductsAndAddAllMenu,
    getAllProductFromLivingRoom,
    getSingleProductByName,
    searchProductByKeyword,
    recommendProducts,
    getProductPage,
} = require('../controllers/ProductController');
const { upload } = require('../helper/cloudinary');

const uploadFields = upload.fields([
    { name: 'white', maxCount: 10 },
    { name: 'blue', maxCount: 10 },
    { name: 'green', maxCount: 10 },
    { name: 'orange', maxCount: 10 },
    { name: 'pink', maxCount: 10 },
    { name: 'gray', maxCount: 10 },
    { name: 'red', maxCount: 10 },
    { name: 'black', maxCount: 10 },
    { name: 'brown', maxCount: 10 },
    { name: 'purple', maxCount: 10 },
    { name: 'yellow', maxCount: 10 },
    { name: 'be', maxCount: 10 },
]);

router.get('/all-product-living', getAllProductFromLivingRoom);
router.post('/add-product', uploadFields, addProductsAndAddAllMenu);
router.get('/get-single-product/:productName', getSingleProductByName);
router.get('/search-products', searchProductByKeyword);
router.get('/recommend-products/:productId', recommendProducts);
router.get('/get-products-page', getProductPage);

module.exports = router;
