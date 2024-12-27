import {
    addToCartApi,
    deleteCartItemApi,
    getCartItemsApi,
    updateCartItemQuantityAndTotalPriceApi,
    updateTotalPriceByIdCartApi,
} from '@/services/cartApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItem: null,
    isCartLoading: true,
    quantity: 1,
    totalPriceProduct: 0,
    color: [],
    nameProduct: null,
    productId: null,
    fullName: null,
    quantityProductInCart: {},
    priceProductInCart: {},
    totalProductInCart: 0,
    discountCode: '',
    discountPrice: 0,
    deliveryFee: 50000,
    totalQuantityInCart: 0,
};

export const getCartItems = createAsyncThunk(
    '/cart/get-cart-items',
    async (userId) => {
        try {
            const response = await getCartItemsApi(userId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addToCart = createAsyncThunk(
    '/cart/add-to-cart',
    async (formData) => {
        try {
            const response = await addToCartApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    '/cart/delete-cart-item',
    async (cartItemId) => {
        try {
            const response = await deleteCartItemApi(cartItemId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const updateCartItemQuantityAndTotalPrice = createAsyncThunk(
    '/cart/update-cart-item-quantity-and-total-price',
    async (formData) => {
        try {
            const response = await updateCartItemQuantityAndTotalPriceApi(
                formData
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const updateTotalPriceByIdCart = createAsyncThunk(
    '/cart/put-totalPrice-Cart',
    async (formData) => {
        try {
            const response = await updateTotalPriceByIdCartApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseQuantity: (state, action) => {
            state.quantity = state.quantity + 1;
            state.totalPriceProduct = state.quantity * action.payload;
        },
        decreaseQuantity: (state, action) => {
            state.quantity = state.quantity - 1;
            state.totalPriceProduct = state.quantity * action.payload;
        },
        increaseQuantityInCart: (state, action) => {
            state.quantityProductInCart[action.payload.productId] =
                state.quantityProductInCart[action.payload.productId] + 1;
            state.priceProductInCart[action.payload.productId] =
                state.quantityProductInCart[action.payload.productId] *
                action.payload.price;
            state.totalProductInCart += action.payload.price;
        },
        decreaseQuantityInCart: (state, action) => {
            state.quantityProductInCart[action.payload.productId] =
                state.quantityProductInCart[action.payload.productId] - 1;
            state.priceProductInCart[action.payload.productId] =
                state.quantityProductInCart[action.payload.productId] *
                action.payload.price;
            state.totalProductInCart -= action.payload.price;
        },
        inputQuantityAndTotalPrice: (state, action) => {
            state.quantityProductInCart[action.payload.productId] =
                action.payload.value;
            state.priceProductInCart[action.payload.productId] =
                action.payload.value * action.payload.price;
            const totalPriceAll = Object.values(
                state.priceProductInCart
            ).reduce((sum, price) => sum + price, 0);
            state.totalProductInCart = totalPriceAll;
        },
        addNameToCart: (state, action) => {
            state.nameProduct = action.payload;
        },

        setIdProduct: (state, action) => {
            state.productId = action.payload;
            if (state.productId) {
                state.quantity = 1;
                state.totalPrice = 0;
                state.nameProduct = null;
                state.color = [];
            }
        },
        updateQuantity: (state, action) => {
            state.quantity =
                action.payload.value < 1
                    ? state.quantity
                    : action.payload.value;
            state.totalPriceProduct = state.quantity * action.payload.price;
        },
        updateColor: (state, action) => {
            let colorArr = [...state.color, action.payload];
            state.color = [...new Set(colorArr)];
        },
        setDiscountPrice: (state, action) => {
            state.discountCode = action.payload;
            console.log('🚀 ~ action.payload:', action.payload);
        },
        setTotalQuantityInCart: (state, action) => {
            state.totalQuantityInCart = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isCartLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                const newQuantityProductInCart = {};
                const newPriceProductInCart = {};

                action.payload?.data?.products?.forEach((product) => {
                    newQuantityProductInCart[product.productId] =
                        product.quantity;
                    newPriceProductInCart[product.productId] =
                        product.totalPriceProduct;
                });

                state.quantityProductInCart = newQuantityProductInCart;
                state.priceProductInCart = newPriceProductInCart;

                state.isCartLoading = false;
                state.totalProductInCart = action.payload?.data?.totalPrice;
                state.cartItem = action.payload?.data;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.isCartLoading = false;
            })
            .addCase(addToCart.pending, (state) => {
                state.isCartLoading = true;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.isCartLoading = true;
                state.cartItem = null;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isCartLoading = false;
            })
            .addCase(updateCartItemQuantityAndTotalPrice.pending, (state) => {
                state.isCartLoading = true;
            })
            .addCase(updateCartItemQuantityAndTotalPrice.fulfilled, (state) => {
                state.isCartLoading = false;
            })
            .addCase(updateCartItemQuantityAndTotalPrice.rejected, (state) => {
                state.isCartLoading = false;
            })
            .addCase(updateTotalPriceByIdCart.pending, (state) => {
                state.isCartLoading = true;
            })
            .addCase(updateTotalPriceByIdCart.fulfilled, (state) => {
                state.isCartLoading = false;
            })
            .addCase(updateTotalPriceByIdCart.rejected, (state) => {
                state.isCartLoading = false;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cartItem = action.payload?.data;
                state.isCartLoading = false;
            });
    },
});

export const {
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    updateColor,
    addNameToCart,
    setIdProduct,
    increaseQuantityInCart,
    decreaseQuantityInCart,
    inputQuantityAndTotalPrice,
    setDiscountPrice,
    setTotalQuantityInCart,
} = cartSlice.actions;
export default cartSlice.reducer;
