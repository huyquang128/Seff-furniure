import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getAllOrderApi = async (userId) => {
    try {
        const response = await axios.get(
            `
            ${GetBaseUrl()}/order/get-all-orders/${userId}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
export const getOrdersApi = async () => {
    try {
        const response = await axios.get(
            `
            ${GetBaseUrl()}/order/get-orders`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addIOrderApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/order/add-orders`,
            formData,
            {
                headers: { 'Content-Type': 'application/json ' },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateOrderApi = async () => {
    try {
        const response = await axios.patch(
            `${GetBaseUrl()}/order/update-order`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteOrderApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/order/delete-order`,
            formData,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// qr code payment
export const createQrOrderZaloApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/order/qr-code-zalo`,
            formData,
            {
                headers: { 'Content-Type': 'application/json ' },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
