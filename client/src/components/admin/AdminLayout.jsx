import { Outlet } from 'react-router-dom';
import HeaderAdmin from './Header';
// import { useEffect, useState } from 'react';
import SidebarAd from './SidebarAd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/redux/authSlice';

function AdminLayout() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state?.auth.theme);
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div className="">
            <SidebarAd />
            <div className={`ml-48 max-md:w-full max-md:ml-0`}>
                <HeaderAdmin />
                <div className="bg-foreground transition-all ease-in-out duration-500 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
