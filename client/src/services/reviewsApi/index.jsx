import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getAllReviewsByProductIdApi = async (productId) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/review/get-reviews-from-product/${productId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const postReviewApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/review/post-reviews`,
            formData,
            { headers: { 'Content-Type': 'application/json ' } }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
