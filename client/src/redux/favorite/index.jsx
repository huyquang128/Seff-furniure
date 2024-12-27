import {
    addFavoriteProductApi,
    deleteAllFavoriteProductApi,
    deleteFavoriteProductApi,
    getFavoriteProductApi,
} from '@/services/favoriteApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    favoriteProduct: null,
    isLoading: false,
    productFavoriteActive: [],
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
    'favorite/delete-favorite-product',
    async (formData) => {
        try {
            const response = await deleteFavoriteProductApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteAllFavoriteProduct = createAsyncThunk(
    'favorite/delete-all-favorite-product',
    async (userId) => {
        try {
            const response = await deleteAllFavoriteProductApi(userId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const favoriteProductSlice = createSlice({
    name: 'favoriteProduct',
    initialState,
    reducers: {
        setProductFavoriteActive: (state, action) => {
            let map = state.productFavoriteActive || []; // Lấy mảng hiện tại từ state hoặc khởi tạo mảng rỗng

            // Kiểm tra nếu id chưa tồn tại thì thêm vào mảng
            if (!map.includes(action.payload) && action.payload !== null) {
                map.push(action.payload);
            }

            state.productFavoriteActive = map;
        },

        clearProductFavoriteActive: (state, action) => {
            let arr = state.productFavoriteActive || [];
            const filterArr = arr.filter((id) => id !== action.payload);
            state.productFavoriteActive = filterArr;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFavoriteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favoriteProduct = action.payload?.success
                    ? action.payload.data
                    : null;
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
            .addCase(deleteFavoriteProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteAllFavoriteProduct.fulfilled, (state) => {
                state.favoriteProduct = [];
                state.productFavoriteActive = [];
            });
    },
});

export const { setProductFavoriteActive, clearProductFavoriteActive } =
    favoriteProductSlice.actions;
export default favoriteProductSlice.reducer;
