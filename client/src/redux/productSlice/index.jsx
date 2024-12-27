import {
    getAllProductFromLivingRoomApi,
    getProductSingleByNameApi,
    getProductsPageApi,
    recommendProductApi,
    searchProductsByKeywordApi,
} from '@/services/productApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    livingRoomAllProd: null,
    isLivingRoomLoading: true,
    singleProductDetail: null,
    productsSearchByKeyword: null,
    productsRecommended: null,
    productPageList: null,
    formAddProduct: {
        name: '',
        brand: '',
        sale: '',
        price: '',
        introduce: '',
        width: '',
        height: '',
        length: '',
        material: '',
        infoDetailProduct: '',
        infoEssential: '',
        infoSafetyStandards: '',
        infoFeatures: '',
    },
};

export const getAllProductFromLivingRoom = createAsyncThunk(
    '/product/getAllProductFromLivingRoom',
    async () => {
        try {
            const response = await getAllProductFromLivingRoomApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);
export const getProductSingleByName = createAsyncThunk(
    '/product/getProductSingleByName',
    async (productName) => {
        try {
            const response = await getProductSingleByNameApi(productName);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const searchProductsByKeyword = createAsyncThunk(
    '/product/searchProduct',
    async (keyword) => {
        try {
            const response = await searchProductsByKeywordApi(keyword);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const recommendProduct = createAsyncThunk(
    'product/recommendProduct',
    async (productId) => {
        try {
            const response = await recommendProductApi(productId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getProductsPage = createAsyncThunk(
    'product/getProductsPage',
    async (pageNumber) => {
        try {
            const response = await getProductsPageApi(pageNumber);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const productsSlice = createSlice({
    name: 'Living Room Product',
    initialState,
    reducers: {
        setProductsSearch: (state, action) => {
            state.productsSearchByKeyword = action.payload;
        },
        setFormAddProduct: (state, action) => {
            state.formAddProduct[action.payload.name] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductFromLivingRoom.pending, (state) => {
                state.isLivingRoomLoading = true;
            })
            .addCase(getAllProductFromLivingRoom.fulfilled, (state, action) => {
                state.isLivingRoomLoading = false;
                state.livingRoomAllProd = action.payload?.success
                    ? action.payload?.data?.products
                    : null;
            })
            .addCase(getAllProductFromLivingRoom.rejected, (state) => {
                state.isLivingRoomLoading = false;
            })
            .addCase(getProductSingleByName.pending, (state) => {
                state.isLivingRoomLoading = true;
            })
            .addCase(getProductSingleByName.fulfilled, (state, action) => {
                state.isLivingRoomLoading = false;
                state.singleProductDetail = action.payload?.data;
            })
            .addCase(getProductSingleByName.rejected, (state) => {
                state.isLivingRoomLoading = false;
            })
            .addCase(searchProductsByKeyword.pending, (state) => {
                state.isLivingRoomLoading = true;
            })
            .addCase(searchProductsByKeyword.fulfilled, (state, action) => {
                state.isLivingRoomLoading = false;
                state.productsSearchByKeyword =
                    action.payload.data.length > 0 ? action.payload.data : [];
            })
            .addCase(searchProductsByKeyword.rejected, (state) => {
                state.isLivingRoomLoading = false;
            })
            .addCase(recommendProduct.pending, (state) => {
                state.isLivingRoomLoading = true;
            })
            .addCase(recommendProduct.fulfilled, (state, action) => {
                state.isLivingRoomLoading = false;
                state.productsRecommended = action.payload?.data;
            })
            .addCase(recommendProduct.rejected, (state) => {
                state.isLivingRoomLoading = false;
            })
            .addCase(getProductsPage.pending, (state) => {
                state.isLivingRoomLoading = true;
            })
            .addCase(getProductsPage.fulfilled, (state, action) => {
                state.isLivingRoomLoading = false;
                state.productPageList = action.payload?.data;
            })
            .addCase(getProductsPage.rejected, (state) => {
                state.isLivingRoomLoading = false;
            });
    },
});

export const { setProductsSearch, setFormAddProduct } = productsSlice.actions;
export default productsSlice.reducer;
