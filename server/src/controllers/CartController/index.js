const mongoose = require('mongoose');
const Cart = require('../../models/cartModel');
const { Product } = require('../../models/productModel');
const User = require('../../models/userModel');

const addToCart = async (req, res) => {
    const {
        productId,
        userId,
        quantity,
        totalPriceProduct,
        color,
        nameProduct,
        price,
        imageUrl,
    } = req.body;

    try {
        const colorArr = Array.isArray(color) ? color : [color];

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            const product = await Product.findById(productId);

            if (!product) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Product not found!' });
            }

            cart = new Cart({
                userId: userId,
                products: [
                    {
                        productId: productId,
                        nameProduct,
                        totalPriceProduct,
                        quantity,
                        price,
                        imageUrl,
                        colors: colorArr,
                    },
                ],
            });
        } else {
            const convertProductIdToObjectId = new mongoose.Types.ObjectId(
                productId
            );
            const itemProduct = cart.products.find((item) => {
                return convertProductIdToObjectId.equals(item.productId);
            });

            if (itemProduct) {
                itemProduct.colors = colorArr;
                itemProduct.quantity += Number(quantity);
                itemProduct.totalPriceProduct += Number(totalPriceProduct);

                await cart.save();
            } else {
                cart.products = [
                    ...cart.products,
                    {
                        productId,
                        quantity,
                        colors: colorArr,
                        nameProduct,
                        price,
                        imageUrl,
                        totalPriceProduct,
                    },
                ];
            }
            await cart.save();
        }

        const newCart = await cart.save();
        res.json({
            success: true,
            message: 'Product added to cart successfully.',
            data: newCart,
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred!',
        });
    }
};

const getCartItemsById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await Cart.findOne({ userId });
        res.json({ success: true, data: cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const updateQuantityAndTotalPiceProductInCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity, priceProductInCart } = req.body;

    try {
        const exitUser = await Cart.findOne({ userId });
        if (!exitUser) {
            return res.status(404).send({ message: 'User cart not found' });
        }
        const productIdsAsObjectId = new mongoose.Types.ObjectId(productId);

        exitUser.products.forEach((product) => {
            if (productIdsAsObjectId.equals(product.productId)) {
                product.quantity = Number(quantity);
                product.totalPriceProduct = Number(priceProductInCart);
            }
        });

        await exitUser.save();

        res.status(200).json({ message: 'updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const deleteCartItem = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        // Check that productIds is a valid array
        if (!Array.isArray(productId) || productId.length === 0) {
            return res.status(400).send({
                message: 'Invalid productIds. It should be a non-empty array.',
            });
        }

        const userCart = await Cart.findOne({ userId });
        if (!userCart) {
            return res.status(404).send({ message: 'User cart not found' });
        }

        // Chuyển đổi productId từ chuỗi sang ObjectId
        const productIdsAsObjectId = productId.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        // Lọc bỏ các sản phẩm có trong danh sách productIds
        userCart.products = userCart.products?.filter((item) => {
            const exists = productIdsAsObjectId.some((productId) =>
                productId.equals(item._id)
            );
            return !exists;
        });

        await userCart.save();
        res.json({
            success: true,
            message: 'Cart item deleted successfully.',
            data: userCart,
        });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

const updateTotalPriceById = async (req, res) => {
    const { cartId } = req.params;
    console.log('🚀 ~ updateTotalPriceById ~ id:', cartId);
    const { totalPriceInCart, discountPrice } = req.body;
    console.log(
        '🚀 ~ updateTotalPriceById ~ totalPriceInCart:',
        totalPriceInCart
    );
    try {
        const totalPrice = totalPriceInCart - discountPrice;
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { totalPrice: totalPrice },
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred!' });
    }
};

module.exports = {
    addToCart,
    getCartItemsById,
    deleteCartItem,
    updateQuantityAndTotalPiceProductInCart,
    updateTotalPriceById,
};
