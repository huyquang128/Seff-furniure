import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getFavoriteProductApi = async (userId) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/favorite/get-favorite-product/${userId}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addFavoriteProductApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/favorite/add-product-favorite`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', // hoặc application/x-www-form-urlencoded
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteFavoriteProductApi = async (formData) => {
    try {
        const response = await axios.delete(
            `${GetBaseUrl()}/favorite/delete-favorite-product`,
            {
                data: formData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', // Chỉ cần nếu bạn thực sự gửi JSON
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
