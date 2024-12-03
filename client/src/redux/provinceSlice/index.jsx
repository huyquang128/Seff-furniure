import {
    GetDistrictsFromVnApi,
    GetProvincesFromVnApi,
    GetWardsFromVnApi,
} from '@/services/GetCityFromVN';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    province: null,
    district: null,
    ward: null,
};

export const getProvincesFromVN = createAsyncThunk(
    'address/get-province',
    async () => {
        try {
            const response = await GetProvincesFromVnApi();
            return response;
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    }
);

export const getDistrictsFromVN = createAsyncThunk(
    'address/get-district',
    async () => {
        try {
            const response = await GetDistrictsFromVnApi();
            return response;
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    }
);

export const getWardsFromVN = createAsyncThunk('address/get-ward', async () => {
    try {
        const response = await GetWardsFromVnApi();
        return response;
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
});

const provinceSlice = createSlice({
    name: 'province',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProvincesFromVN.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProvincesFromVN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.province = action.payload;
            })
            .addCase(getProvincesFromVN.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getDistrictsFromVN.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDistrictsFromVN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.district = action.payload;
            })
            .addCase(getDistrictsFromVN.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getWardsFromVN.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWardsFromVN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ward = action.payload;
            })
            .addCase(getWardsFromVN.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default provinceSlice.reducer;
