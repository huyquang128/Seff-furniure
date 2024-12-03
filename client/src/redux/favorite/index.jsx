import {
    addFavoriteProductApi,
    deleteFavoriteProductApi,
    getFavoriteProductApi,
} from '@/services/favoriteApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    favoriteProduct: null,
    isLoading: false,
};

export const getFavoriteProduct = createAsyncThunk(
    'favorite/get-favorite-product',
    async (userId) => {
        try {
            const response = await getFavoriteProductApi(userId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addFavoriteProduct = createAsyncThunk(
    'favorite/add-favorite-product',
    async (formData) => {
        try {
            const response = await addFavoriteProductApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteFavoriteProduct = createAsyncThunk(
    'favorite/add-favorite-product',
    async (formData) => {
        try {
            const response = await deleteFavoriteProductApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const favoriteProductSlice = createSlice({
    name: 'favoriteProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFavoriteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favoriteProduct = action.payload.data;
            })
            .addCase(getFavoriteProduct.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addFavoriteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFavoriteProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addFavoriteProduct.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addFavoriteProduct.fulfilled, (state) => {
                state.isLoading = false;
            });
    },
});

export default favoriteProductSlice.reducer;
