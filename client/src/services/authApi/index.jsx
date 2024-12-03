import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';
import { Bounce, toast } from 'react-toastify';

export const registerApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/register`,
            formData,
            {
                withCredentials: true,
            }
        );
        console.log('🚀 ~ registerApi ~ response.data:', response.data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const loginApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/login`,

            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error(`Người dùng chưa đăng ký 😢 `, {
            position: 'top-center',
            autoClose: 3000,
            text: 'black',
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
        });
    }
};

export const logoutApi = async () => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const checkAuthApi = async () => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/auth/check-auth`,

            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const uploadAvatarApi = async (formData) => {
    try {
        const data = new FormData();
        data.append('avatar', formData.avatar);

        const response = await axios.post(
            `${GetBaseUrl()}/auth/upload-avatar/${formData.userId}`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo gửi dạng multipart
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateProfileApi = async (formData) => {
    try {
        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('phone', formData.phone);
        data.append('email', formData.email);
        data.append('detailAddress', formData.detailAddress);
        const response = await axios.post(
            `${GetBaseUrl()}/auth/update-profile-user/${formData.userId}`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo gửi dạng multipart
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
