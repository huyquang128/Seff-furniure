import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getMenuNavApi = async () => {
    try {
        const response = await axios.get(
            // 'http://localhost:3000/get-all'
            `${GetBaseUrl()}/get-all`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getChildMenuAPi = async () => {
    try {
        const response = await axios.get(
            // 'http://localhost:3000/get-child-menu'
            `${GetBaseUrl()}/get-child-menu`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
