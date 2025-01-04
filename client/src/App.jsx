import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import HomeLayout from './components/home/HomeLayout';
import AboutHome from './pages/home/AboutHome';
import ServiceHome from './pages/home/ServiceHome';
import Contact from './pages/home/Contact';
import ActualProduct from './pages/home/ActualProduct';
import CharacteristicDesign from './pages/home/CharacteristicDesign';
import NotFound from './pages/notfound';
import Unauth from './pages/unauth';
import HomePage from './pages/home/homePage';
import CheckAuth from './components/common/CheckAuth';
import Login from './pages/auth/Loign';
import Register from './pages/auth/Register';
import AuthLayout from './components/auth/AuthLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getProfileUser } from './redux/authSlice';
import RoomLayout from './pages/rooms/RoomLayout';
import LivingRoom from './pages/rooms/LivingRoom';
import BedRoom from './pages/rooms/BedRoom';
import KitchenRoom from './pages/rooms/KitchenRoom';
import WorkRoom from './pages/rooms/WorkRoom';
import Cart from './pages/carts';
import DeliveryInformation from './pages/checkout/DeliveryInformation';
import ErrorBoundary from './ErrorBoundary';
import CheckOutLayout from './components/checkOut/CheckOutLayout';
import MethodPayment from './pages/checkout/MethodPayment';
import PersonalInfor from './pages/user/PersonalInfor';
import MyOrder from './pages/user/MyOrder';
import MyFavorite from './pages/user/MyFavorite';
import ManageAddress from './pages/user/ManageAddress';
import SaveCard from './pages/user/SaveCard';
import Setting from './pages/user/Setting';
import UserLayout from './components/user/UserLayout';
import AllOrder from './pages/user/StatusOrder/AllOrder';
import ProcessingOrder from './pages/user/StatusOrder/ProcessingOrder';
import Shipped from './pages/user/StatusOrder/Shipped';
import Delivered from './pages/user/StatusOrder/Delivered';
import Canceled from './pages/user/StatusOrder/Canceled';
import ProductAd from './pages/admin/ProductAd';
import Blog from './pages/home/Blog';
import { routeLiving } from './routes/RouteLiving';
import { routeBedRoom } from './routes/RouteBedRoom';
import { routeKitchen } from './routes/RouteKitchen';
import { routeWorkplace } from './routes/RouteWorkplace';
import Order from './pages/admin/Order';
import SettingAd from './pages/admin/Setting';
import Customer from './pages/admin/Customer';
import BlogAd from './pages/admin/BlogAd';
import ProductDetail from './pages/product/ProductDetail';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user);
    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) dispatch(getProfileUser(user?.id));
    }, [dispatch, user?.id]);

    return (
        <Routes>
            {/* route admin */}
            <Route
                path="/admin"
                element={
                    <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                        <ErrorBoundary>
                            <AdminLayout />
                        </ErrorBoundary>
                    </CheckAuth>
                }
            >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="Product" element={<ProductAd />} />
                <Route path="Customer" element={<Customer />} />
                <Route path="Order" element={<Order />} />
                <Route path="Blog" element={<BlogAd />} />
                <Route path="Setting" element={<SettingAd />} />
            </Route>

            {/* route auth */}
            <Route
                path="/auth"
                element={
                    <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                        <AuthLayout />
                    </CheckAuth>
                }
            >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* route home */}
            <Route
                path="/"
                element={
                    <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                        <HomeLayout />
                    </CheckAuth>
                }
            >
                <Route
                    path=""
                    element={
                        <ErrorBoundary>
                            <HomePage />
                        </ErrorBoundary>
                    }
                />
                <Route path="about" element={<AboutHome />} />
                <Route path="service" element={<ServiceHome />} />
                <Route
                    path="characteristic-design"
                    element={<CharacteristicDesign />}
                />
                <Route path="actual-product" element={<ActualProduct />} />
                <Route path="contact" element={<Contact />} />
                <Route path="Blog" element={<Blog />} />
            </Route>

            <Route path="/room" element={<RoomLayout />}>
                {/* LIVING ROOM  */}
                <Route path="living-room" element={<LivingRoom />} />

                {routeLiving.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                {/* BED ROOM */}
                <Route path="bed-room" element={<BedRoom />} />
                {routeBedRoom.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                {/* KITCHEN */}
                <Route path="kitchen" element={<KitchenRoom />} />
                {routeKitchen.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.component}
                    />
                ))}

                {/* WORK ROOM */}
                <Route path="work-room" element={<WorkRoom />} />
                {routeWorkplace.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.component}
                    />
                ))}

                {/* <Route
                    path="living-room/:productName"
                    element={<ProductDetail />}
                /> */}
            </Route>

            <Route path="/:productName" element={<ProductDetail />} />
            <Route path="/your-cart" element={<Cart />} />
            <Route path="/cart" element={<CheckOutLayout />}>
                <Route
                    path="checkout-step-1"
                    element={
                        <ErrorBoundary>
                            <DeliveryInformation />
                        </ErrorBoundary>
                    }
                />
                <Route
                    path="checkout-step-2"
                    element={
                        <ErrorBoundary>
                            <MethodPayment />
                        </ErrorBoundary>
                    }
                />
            </Route>

            {/* route user */}
            <Route path="user" element={<UserLayout />}>
                <Route
                    path="Personal-Information"
                    element={<PersonalInfor />}
                />
                <Route path="My-orders" element={<MyOrder />}>
                    <Route path="All-Orders" element={<AllOrder />} />
                    <Route
                        path="Processing-Order"
                        element={<ProcessingOrder />}
                    />
                    <Route path="Shipping-Order" element={<Shipped />} />
                    <Route path="Delivered-Order" element={<Delivered />} />
                    <Route path="Canceled-Order" element={<Canceled />} />
                </Route>
                <Route path="My-favorite" element={<MyFavorite />} />
                <Route path="manage-address" element={<ManageAddress />} />
                <Route path="save-card" element={<SaveCard />} />
                <Route path="setting" element={<Setting />} />
            </Route>

            {/* route not found */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauth" element={<Unauth />} />
        </Routes>
    );
}

export default App;
