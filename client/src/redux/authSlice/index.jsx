import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    addAddressUserApi,
    addUserApi,
    checkAuthApi,
    getAllUserApi,
    getProfileUserApi,
    loginApi,
    logoutApi,
    registerApi,
    removeAddressUserApi,
    removeUserApi,
    updateAddressUserApi,
    updateProfileApi,
    uploadAvatarApi,
} from '@/services/authApi';

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
    allUser: null,
    formInfoUser: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
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
        firstName: '',
        lastName: '',
        phone: '',
        detailAddress: '',
    },
    formAddUser: {
        username: '',
        email: '',
        password: '',
        phone: '',
    },
    filterDistrictsToProvince: null,
    filterWardsToDistrict: null,
    temporary: {
        valueProvince: {
            value: '',
            code: null,
        },
        valueDistrict: {
            value: '',
            code: null,
        },
        valueWard: {
            value: '',
            code: null,
        },
    },
    formSettingAdmin: {
        siteName: '',
        copyRight: '',
        seoTitle: '',
        seoDescription: '',
        seoKeyword: '',
    },
    urlImgAvatar: null,
    isActiveCategoryUserInfoTitle: 'Personal-Information',
    addressStore: 'hn',
    theme: 'light',
    isLabelSelectProvince: false,
    addressDefault: 0,
    typeAddOrUpdateUser: false,
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

export const getProfileUser = createAsyncThunk(
    'auth/getProfileUser',
    async (userId) => {
        try {
            const response = await getProfileUserApi(userId);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const addAddressUser = createAsyncThunk(
    'auth/add-address-user',
    async (formData) => {
        try {
            const response = await addAddressUserApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);
export const updateAddressUser = createAsyncThunk(
    'auth/update-address-user',
    async (formData) => {
        try {
            const response = await updateAddressUserApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);
export const removeAddressUser = createAsyncThunk(
    'auth/remove-address-user',
    async (formData) => {
        try {
            const response = await removeAddressUserApi(formData);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getAllUsers = createAsyncThunk('auth/get-all-users', async () => {
    try {
        const response = await getAllUserApi();
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const addUser = createAsyncThunk('auth/add-user', async (formData) => {
    try {
        const response = await addUserApi(formData);
        return response;
    } catch (error) {
        console.error(error);
    }
});

export const removeUser = createAsyncThunk(
    'auth/remove-user',
    async (formData) => {
        try {
            const response = await removeUserApi(formData);
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
        setDistricts: (state, action) => {
            state.filterDistrictsToProvince = action.payload;
        },
        setWards: (state, action) => {
            state.filterWardsToDistrict = action.payload;
        },
        setValueProvince: (state, action) => {
            state.temporary.valueProvince.value = action.payload.value;
            state.temporary.valueProvince.code = action.payload.code;
        },
        setValueDistrict: (state, action) => {
            state.temporary.valueDistrict.value = action.payload.value;
            state.temporary.valueDistrict.code = action.payload.code;
        },
        setValueWard: (state, action) => {
            state.temporary.valueWard.value = action.payload.value;
            state.temporary.valueWard.code = action.payload.code;
        },
        setUpdateAddressContent: (state, action) => {
            action.payload.type === 'update address'
                ? (state.isLabelSelectProvince = true)
                : (state.isLabelSelectProvince = false);
            state.formAddAddressNew.firstName = action.payload.firstName;
            state.formAddAddressNew.lastName = action.payload.lastName;
            state.formAddAddressNew.phone = action.payload.phone;
            state.formAddAddressNew.detailAddress = action.payload.detailed;

            state.temporary.valueProvince.value = action.payload.province;
            state.temporary.valueDistrict.value = action.payload.district;
            state.temporary.valueWard.value = action.payload.ward;
        },
        setAddressDefault: (state, action) => {
            state.addressDefault = action.payload;
        },
        setTypeUser: (state, action) => {
            state.typeAddOrUpdateUser = action.payload.type;
            state.formAddUser = action.payload.form;
        },
        setAddUser: (state, action) => {
            state.formAddUser[action.payload.name] = action.payload.value;
        },
        setFormSettingAdmin: (state, action) => {
            state.formSettingAdmin[action.payload.name] = action.payload.value;
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
                state.isAuthenticated = action.payload?.success;
                state.user = action.payload?.success
                    ? action.payload?.user
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
            })
            .addCase(getProfileUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfileUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.urlImgAvatar = action.payload?.data.urlImgAvatar;
                state.user = action.payload?.data;
                state.formInfoUser = {
                    firstName: action.payload?.data.firstName,
                    lastName: action.payload?.data.lastName,
                    phone: action.payload?.data.phone,
                    email: action.payload?.data.email,
                };
            })
            .addCase(getProfileUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(removeAddressUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUser = action.payload?.data;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(removeUser.fulfilled, (state) => {
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
    setDistricts,
    setWards,
    setValueProvince,
    setValueDistrict,
    setValueWard,
    setUpdateAddressContent,
    setAddressDefault,
    setAddUser,
    setTypeUser,
    setFormSettingAdmin,
} = authSlice.actions;
export default authSlice.reducer;
