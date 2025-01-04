import { getAllBlogApi, getBlogPageApi } from '@/services/blogApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    blogs: null,
};

export const getBlogPage = createAsyncThunk(
    'blog/get-blog-page',
    async (pageNumber) => {
        try {
            const response = await getBlogPageApi(pageNumber);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogPage.fulfilled, (state, action) => {
                state.blogs = action.payload.data.blogs;
                state.isLoading = false;
            })
            .addCase(getBlogPage.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default blogSlice.reducer;
