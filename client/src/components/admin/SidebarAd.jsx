import cart_black from '@/assets/svg/admin/cart_black.svg';
import cart_yellow from '@/assets/svg/admin/cart_yellow.svg';
import cart_white from '@/assets/svg/admin/cart_white.svg';
import logout from '@/assets/svg/admin/logout.svg';
import logout_white from '@/assets/svg/admin/logout_white.svg';
import logout_yellow from '@/assets/svg/admin/logout_yellow.svg';
import products_white from '@/assets/svg/admin/products_white.svg';
import products_yellow from '@/assets/svg/admin/products_yellow.svg';
import products from '@/assets/svg/admin/products.svg';
import setting_white from '@/assets/svg/admin/setting_white.svg';
import setting_yellow from '@/assets/svg/admin/setting_yellow.svg';
import setting from '@/assets/svg/admin/setting.svg';
import dashboard_black from '@/assets/svg/admin/dashboard_black.svg';
import dashboard_white from '@/assets/svg/admin/dashboard_white.svg';
import dashboard_yellow from '@/assets/svg/admin/dashboard_yellow.svg';
import user2 from '@/assets/svg/user2.svg';
import user2_white from '@/assets/svg/user2_white.svg';
import user2_yellow from '@/assets/svg/user2_yellow.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const listCategoryAd = [
    {
        name: 'Dashboard',
        link: 'dashboard',
        svg: dashboard_black,
        svg_white: dashboard_white,
        svg_yellow: dashboard_yellow,
    },
    {
        name: 'Products',
        link: 'Product',
        svg: products,
        svg_white: products_white,
        svg_yellow: products_yellow,
    },
    {
        name: 'User',
        link: 'User',
        svg: user2,
        svg_white: user2_white,
        svg_yellow: user2_yellow,
    },
    {
        name: 'Order',
        link: 'Order',
        svg: cart_black,
        svg_white: cart_white,
        svg_yellow: cart_yellow,
    },
    {
        name: 'Setting',
        link: 'Setting',
        svg: setting,
        svg_white: setting_white,
        svg_yellow: setting_yellow,
    },
    {
        name: 'Logout',
        link: 'Logout',
        svg: logout,
        svg_white: logout_white,
        svg_yellow: logout_yellow,
    },
];

function SidebarAd() {
    const [categoryActive, setCategoryActive] = useState(0);
    const theme = useSelector((state) => state?.auth.theme);

    return (
        <div
            className="flex-1 bg-background transition-colors ease-in-out duration-500
        max-md:hidden"
        >
            <h1 className="font-bold text-yellow-base text-xl py-6 px-5 text-center">
                HOMECOR.
            </h1>
            <div className=" px-3 py-2 text-sm">
                {listCategoryAd.map((category, index) => (
                    <Link key={index} to={category.link}>
                        <div
                            onClick={() => setCategoryActive(index)}
                            className={`flex gap-5 items-center py-3 font-medium ${
                                categoryActive === index
                                    ? 'bg-orange-100 text-yellow-600 '
                                    : 'text-text-first'
                            } px-2 rounded-lg  mb-4 transition-all ease-in-out duration-400`}
                        >
                            <img
                                src={
                                    theme === 'dark'
                                        ? categoryActive === index
                                            ? category.svg_yellow // Dark mode và active
                                            : category.svg_white // Dark mode và không active
                                        : categoryActive === index
                                        ? category.svg_yellow // Light mode và active
                                        : category.svg
                                }
                                alt=""
                                className="-translate-y-[2px] h-[17px]"
                            />
                            <div>{category.name}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SidebarAd;
