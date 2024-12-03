import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getAllProductFromLivingRoomApi = async () => {
    try {
        const response = await axios.get(
            // 'http://localhost:3000/product/all-product-living'
            `${GetBaseUrl()}/product/all-product-living`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getProductSingleByNameApi = async (productName) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/product/get-single-product/${productName}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const searchProductsByKeywordApi = async (keyword) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/product/search-products`,
            {
                params: {
                    keyword,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const recommendProductApi = async (productId) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/product/recommend-products/${productId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getProductsPageApi = async (page) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/product/get-products-page`,
            {
                params: {
                    page,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
