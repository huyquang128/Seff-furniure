import axios from 'axios';

export async function GetProvincesFromVnApi() {
    try {
        const response = await axios.get(
            'https://provinces.open-api.vn/api/p/'
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function GetDistrictsFromVnApi() {
    try {
        const response = await axios.get(
            `https://provinces.open-api.vn/api/d/`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function GetWardsFromVnApi() {
    try {
        const response = await axios.get(
            `https://provinces.open-api.vn/api/w/`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
