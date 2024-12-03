import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    checkAuthApi,
    loginApi,
    logoutApi,
    registerApi,
    updateProfileApi,
    uploadAvatarApi,
} from '@/services/authApi';

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
    formInfoUser: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        detailAddress: '',
    },
    formValueLogin: {
        email: '',
        password: '',
    },
    formValueRegister: {
        username: '',
        email: '',
        password: '',
    },
    formAddAddressNew: {
        name: '',
        phone: '',
        detailAddress: '',
        province: '',
        district: '',
        ward: '',
    },
    urlImgAvatar: null,
    isActiveCategoryUserInfoTitle: 'Personal-Information',
    addressStore: 'hn',
    theme: 'light',
};

export const register = createAsyncThunk('auth/register', async (formData) => {
    try {
        const response = await registerApi(formData);
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const login = createAsyncThunk('auth/login', async (formData) => {
    try {
        const response = await loginApi(formData);
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await logoutApi();
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
    try {
        const response = await checkAuthApi();
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (formData) => {
        try {
            const response = await uploadAvatarApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (formData) => {
        try {
            const response = await updateProfileApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFormLogin: (state, action) => {
            state.formValueLogin[action.payload.name] = action.payload.value;
        },
        setFormRegister: (state, action) => {
            state.formValueRegister[action.payload.name] = action.payload.value;
        },
        setFormInfoUser: (state, action) => {
            state.formInfoUser[action.payload.name] = action.payload.value;
        },
        setUrlImageAvatar: (state, action) => {
            state.urlImgAvatar = action.payload;
        },
        setActiveTileCategoryUserInfo: (state, action) => {
            state.isActiveCategoryUserInfoTitle = action.payload;
        },
        setFormAddAddressNew: (state, action) => {
            state.formAddAddressNew[action.payload.name] = action.payload.value;
        },
        setAddressStore: (state, action) => {
            state.addressStore = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'; // Đổi giữa light và dark
        },
        setTheme: (state, action) => {
            state.theme = action.payload; // Cập nhật theme theo giá trị được truyền vào
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.formValueLogin = {
                    email: '',
                    password: '',
                };
                state.formValueRegister = {
                    username: '',
                    email: '',
                    password: '',
                };
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('user from sever: ', action.payload);
                state.isLoading = false;
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.success
                    ? action.payload.user
                    : null;
                state.formValueLogin = {
                    email: '',
                    password: '',
                };
                state.formValueRegister = {
                    username: '',
                    email: '',
                    password: '',
                };
                state.formInfoUser = {
                    ...state.formInfoUser,
                    email: action.payload?.user.email,
                };
                state.urlImgAvatar = action.payload.success
                    ? action.payload.user.urlImgAvatar
                    : null;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.user = false;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.success
                    ? action.payload.user
                    : null;

                state.isAuthenticated = action.payload?.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(uploadAvatar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.urlImgAvatar = action.payload?.data;
            })
            .addCase(uploadAvatar.rejected, (state) => {
                state.isLoading = false;
            });
    },
});
export const {
    setFormLogin,
    setFormRegister,
    setFormInfoUser,
    setUrlImageAvatar,
    setActiveTileCategoryUserInfo,
    setFormAddAddressNew,
    setAddressStore,
    setTheme,
    toggleTheme,
} = authSlice.actions;
export default authSlice.reducer;
