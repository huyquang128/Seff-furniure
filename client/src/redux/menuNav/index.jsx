import { getMenuNavApi } from '@/services/menuNavApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    menuNav: null,
    isLoading: true,
    categoryProductHotActive: 0,
    categoryLink: '/room/living-room',
};

export const getAllMenuNav = createAsyncThunk(
    '/get-all-menu-navigation',
    async () => {
        try {
            const response = await getMenuNavApi();
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const menuNavSlice = createSlice({
    name: 'menuNav',
    initialState,
    reducers: {
        setCategoryProductHot: (state, action) => {
            state.categoryProductHotActive = action.payload.index;
            state.categoryLink = action.payload.link;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMenuNav.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMenuNav.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menuNav = action.payload?.success
                    ? action.payload?.data
                    : null;
            })
            .addCase(getAllMenuNav.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setCategoryProductHot } = menuNavSlice.actions;
export default menuNavSlice.reducer;
