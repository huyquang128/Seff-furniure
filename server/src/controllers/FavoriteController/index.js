const mongoose = require('mongoose');
const Favorite = require('../../models/favoriteModel');

const addFavoriteProduct = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Check if the user already has this product as a favorite
        const favorite = await Favorite.findOne({ userId });
        const productIdArr = Array.isArray(productId) ? productId : [productId];

        if (favorite) {
            const isAlreadyProductFavorite = favorite.products.some((id) => {
                return productIdArr.includes(id.toString());
            });

            if (isAlreadyProductFavorite) {
                return res.status(400).json({
                    success: false,
                    message: 'This product is already in your favorite list.',
                });
            }

            favorite.products.push(...productIdArr);
            await favorite.save();

            res.status(200).json({
                success: true,
                message:
                    'Sản phẩm đã được thêm vào danh sách yêu thích của bạn.',
            });
        } else {
            // Add the product to the user's favorite list
            const newFavorite = new Favorite({
                userId,
                products: productIdArr,
            });

            await newFavorite.save();

            res.status(200).json({
                success: true,
                message: 'Product added to your favorite list.',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const getFavoriteProduct = async (req, res) => {
    const { userId } = req.params;
    try {
        const checkFavorite = await Favorite.findOne({ userId });
        if (!checkFavorite) {
            return res.status(404).json({
                success: false,
                message: 'No favorite products found.',
            });
        } else {
            const getProductFavorite = await Favorite.findOne().populate({
                path: 'products',
            });

            return res
                .status(200)
                .json({ success: true, data: getProductFavorite });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const deleteFavoriteProduct = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const checkFavoriteUser = await Favorite.findOne({ userId });

        if (!checkFavoriteUser) {
            return res.status(404).json({
                success: false,
                message: 'No favorite products found.',
            });
        } else {
            const result = checkFavoriteUser.products.filter(
                (id) => id.toString() !== productId
            );
            checkFavoriteUser.products = [...result];
            await checkFavoriteUser.save();

            return res.status(200).json({
                success: true,
                message: 'Sản phẩm đã bị xóa khỏi danh sách yêu thích của bạn.',
                data: checkFavoriteUser,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const deleteAllFavoriteProduct = async (req, res) => {
    const { userId } = req.params;
    try {
        await Favorite.deleteOne({ userId });
        res.status(200).json({
            success: true,
            message: 'All favorite products deleted.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    addFavoriteProduct,
    getFavoriteProduct,
    deleteFavoriteProduct,
    deleteAllFavoriteProduct,
};
