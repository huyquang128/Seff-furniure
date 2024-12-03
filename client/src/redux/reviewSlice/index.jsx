import {
    getAllReviewsByProductIdApi,
    postReviewApi,
} from '@/services/reviewsApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    reviews: null,
    averageStar: 0,
    starArrEvaluated: [],
    rating: 5,
    comment: '',
    author: '',
};

export const getReviewsByProductId = createAsyncThunk(
    'review/get-by-product-id',
    async (productId) => {
        try {
            const response = await getAllReviewsByProductIdApi(productId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const postReview = createAsyncThunk(
    'review/post-reviews',
    async (formData) => {
        try {
            const response = await postReviewApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setStarEvaluated: (state, action) => {
            state.starArrEvaluated = Array.from(
                { length: action.payload + 1 },
                (_, i) => i
            );
            state.rating = action.payload + 1;
        },
        setValueComment: (state, action) => {
            state.comment = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviewsByProductId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviewsByProductId.fulfilled, (state, action) => {
                state.reviews = action.payload.data;
                state.isLoading = false;
                const averageRating =
                    action.payload.data?.reduce((acc, review) => {
                        return acc + review.rating;
                    }, 0) / action.payload.data?.length || 0;
                state.averageStar = averageRating?.toFixed(1)
                    ? averageRating?.toFixed(1)
                    : 0;
            })
            .addCase(getReviewsByProductId.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(postReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postReview.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(postReview.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setStarEvaluated, setValueComment, setAuthor } =
    reviewSlice.actions;
export default reviewSlice.reducer;
