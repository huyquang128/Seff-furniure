import { Outlet } from 'react-router-dom';
import HeaderAdmin from './Header';
// import { useEffect, useState } from 'react';
import SidebarAd from './SidebarAd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function AdminLayout() {
    const theme = useSelector((state) => state?.auth.theme);
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="flex">
            <SidebarAd />
            <div className="w-11/12 max-xl:w-10/12 max-md:w-full">
                <HeaderAdmin />
                <div className=" bg-foreground transition-all ease-in-out duration-500">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
