import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';

export const getAllBlogApi = async () => {
    try {
        const response = await axios.get(`${GetBaseUrl()}/blog/get-all-blog`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getBlogPageApi = async (pageNumber) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/blog/get-blog-page?page=${pageNumber}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
