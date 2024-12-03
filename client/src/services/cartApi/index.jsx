import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getCartItemsApi = async (userId) => {
    try {
        const response = await axios.get(
            // `http://localhost:3000/cart/get-cart-items/${userId}`,
            `${GetBaseUrl()}/cart/get-cart-items/${userId}`,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addToCartApi = async (formData) => {
    try {
        const response = await axios.post(
            // 'http://localhost:3000/cart/add-to-cart',
            `${GetBaseUrl()}/cart/add-to-cart`,
            formData,
            { headers: { 'Content-Type': 'application/json' } },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteCartItemApi = async (itemId) => {
    try {
        const response = await axios.delete(
            // `http://localhost:3000/cart/delete-cart-item/${itemId.userId}`,
            `${GetBaseUrl()}/cart/delete-cart-item/${itemId.userId}`,
            {
                data: { productId: itemId.productIds }, // Đây là cách truyền payload trong DELETE request
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateCartItemQuantityAndTotalPriceApi = async (formData) => {
    try {
        const response = await axios.post(
            // `http://localhost:3000/cart/update-quantity-totalProduct-cart/${formData.userId}`,
            `${GetBaseUrl()}/cart/update-quantity-totalProduct-cart/${
                formData.userId
            }`,
            {
                productId: formData.productId,
                quantity: formData.quantity,
                priceProductInCart: formData.priceProductInCart,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
