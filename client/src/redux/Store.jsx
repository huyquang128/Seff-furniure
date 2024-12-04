import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/authSlice/index';
import menuNavReducer from '@/redux/menuNav/index';
import productsReducer from '@/redux/productSlice/index';
import cartReducer from '@/redux/cartSlice/index';
import provinceReducer from '@/redux/provinceSlice/index';
import orderReducer from '@/redux/orderSlice/index';
import reviewReducer from '@/redux/reviewSlice/index';
import favoriteReducer from '@/redux/favorite/index';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = {
    auth: persistReducer(persistConfig, authReducer),
    menuNav: menuNavReducer,
    products: persistReducer(persistConfig, productsReducer),
    cart: persistReducer(persistConfig, cartReducer),
    province: provinceReducer,
    order: persistReducer(persistConfig, orderReducer),
    review: persistReducer(persistConfig, reviewReducer),
    favoriteProducts: persistReducer(persistConfig, favoriteReducer),
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, //Action này dọn dẹp các cập nhật trạng thái chưa được lưu vào storage, đảm bảo rằng mọi thay đổi trong Redux store sẽ được đồng bộ hoàn toàn vào storage
                    REHYDRATE, //  khôi phục lại (rehydrate) state từ storage vào Redux store khi ứng dụng khởi động
                    PAUSE, //Action này tạm dừng quá trình lưu trữ. Khi PAUSE được kích hoạt, Redux sẽ ngừng lưu state vào storage cho đến khi PERSIST được gọi lại.
                    PERSIST, //kích hoạt quá trình lưu trữ (persist) state của Redux vào storage
                    PURGE, //xóa dữ liệu đã được lưu trữ trong storage
                    REGISTER, //Action này được dispatch khi một reducer được đăng ký (register) với Redux Persist. Nó giúp xác định reducer nào đang sử dụng persist trong store.
                ],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
