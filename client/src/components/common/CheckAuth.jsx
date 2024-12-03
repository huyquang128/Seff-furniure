/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ user, isAuthenticated, children }) {
    const location = useLocation();

    // Chuyển hướng admin từ root sang dashboard
    if (
        location.pathname === '/' &&
        isAuthenticated &&
        user?.role === 'admin'
    ) {
        return <Navigate to="/admin/dashboard" />;
    }

    // Chuyển hướng người dùng chưa đăng nhập đến trang login
    if (
        !isAuthenticated &&
        !(
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
        )
    ) {
        return <Navigate to="/auth/login" />;
    }

    // Ngăn truy cập lại login hoặc register khi đã đăng nhập
    if (
        isAuthenticated &&
        (location.pathname.includes('/login') ||
            location.pathname.includes('/register'))
    ) {
        return user?.role === 'admin' ? (
            <Navigate to="/admin/dashboard" />
        ) : (
            <Navigate to="/" />
        );
    }

    // Ngăn người dùng không phải admin truy cập các trang admin
    if (
        isAuthenticated &&
        user?.role !== 'admin' &&
        location.pathname.includes('admin')
    ) {
        return <Navigate to="/unauth-page" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
