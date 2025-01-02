import axios from 'axios';
import GetBaseUrl from '../GetBaseUrl';
import ToastMessage from '@/components/common/ToastMessage';

export const registerApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/register`,
            formData,
            {
                withCredentials: true,
            }
        );

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
        ToastMessage({
            message: 'Người dùng chưa đăng ký 😢',
            position: 'top-center',
            status: 'error',
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
        const response = await axios.post(
            `${GetBaseUrl()}/auth/add-profile-user/${formData.userId}`,
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

export const getProfileUserApi = async (userId) => {
    try {
        const response = await axios.get(
            `${GetBaseUrl()}/auth/get-profile-user/${userId}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo gửi dạng json
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addAddressUserApi = async (formData) => {
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('phone', formData.phone);
    data.append('detailAddress', formData.detailAddress);
    data.append('province', formData.province);
    data.append('district', formData.district);
    data.append('ward', formData.ward);
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/add-address-user/${formData.userId}`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo gửi dạng json
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateAddressUserApi = async (formData) => {
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('addressId', formData.addressId);
    data.append('lastName', formData.lastName);
    data.append('phone', formData.phone);
    data.append('detailAddress', formData.detailAddress);
    data.append('province', formData.province);
    data.append('district', formData.district);
    data.append('ward', formData.ward);
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/update-address-user/${formData.userId}`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const removeAddressUserApi = async (formData) => {
    try {
        const response = await axios.delete(
            `${GetBaseUrl()}/auth/remove-address-user/${
                formData.userId
            }?addressId=${formData.addressId}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllUserApi = async () => {
    try {
        const response = await axios.get(`${GetBaseUrl()}/auth/get-all-user`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addUserApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/add-user`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const removeUserApi = async (formData) => {
    try {
        const response = await axios.post(
            `${GetBaseUrl()}/auth/remove-user`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
