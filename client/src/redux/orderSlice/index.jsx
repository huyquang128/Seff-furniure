import {
    addIOrderApi,
    createQrOrderZaloApi,
    deleteOrderApi,
    getAllOrderApi,
    getOrdersApi,
    updateOrderApi,
} from '@/services/orderApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: null,
    ordersDeleted: [],
    isLoading: true,
    errorMessageInputs: {},
    inputIndex: null,
    methodPayment: null,
    qrCodeZalo: null,
};

export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async (userId) => {
        try {
            const response = await getAllOrderApi(userId);
            return response;
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    }
);

export const getOrders = createAsyncThunk('order/getOrders', async () => {
    try {
        const response = await getOrdersApi();
        return response;
    } catch (error) {
        console.error('Error fetching order:', error);
    }
});

export const addOrder = createAsyncThunk('order/addOrder', async (formData) => {
    try {
        const response = await addIOrderApi(formData);
        return response;
    } catch (error) {
        console.error('Error adding order:', error);
    }
});

export const updateOrder = createAsyncThunk('order/updateOrder', async () => {
    try {
        const response = await updateOrderApi();
        return response;
    } catch (error) {
        console.error('Error updating order:', error);
    }
});

export const removeOrder = createAsyncThunk(
    'order/removeOrder',
    async (formData) => {
        try {
            const response = await deleteOrderApi(formData);
            return response;
        } catch (error) {
            console.error('Error removing order:', error);
        }
    }
);

export const createQrOrderZalo = createAsyncThunk(
    'order/createQrOrderZalo',
    async (formData) => {
        try {
            const response = await createQrOrderZaloApi(formData);
            return response;
        } catch (error) {
            console.error('Error creating QR code:', error);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setValueMethodPayment: (state, action) => {
            state.methodPayment = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.orders = action.payload?.data;
                state.isLoading = false;
            })
            .addCase(getAllOrder.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload?.data;
                state.isLoading = false;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addOrder.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateOrder.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(removeOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createQrOrderZalo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQrOrderZalo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.qrCodeZalo = action.payload?.data.orderurl;
            })
            .addCase(createQrOrderZalo.rejected, (state) => {
                state.isLoading = false;
            });
    },
});
export const { setValueFormUser, setValueMethodPayment } = orderSlice.actions;
export default orderSlice.reducer;
