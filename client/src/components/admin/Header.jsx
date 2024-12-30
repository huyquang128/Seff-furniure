import bell from '@/assets/svg/bell.svg';
import bell_white from '@/assets/svg/bell_white.svg';
import search from '@/assets/svg/search.svg';
import search_gray from '@/assets/svg/search_gray.svg';
import dark_mode from '@/assets/svg/admin/dark_mode.svg';
import light_mode from '@/assets/svg/admin/light_mode.svg';
import { useEffect, useState } from 'react';
import menu_black from '@/assets/svg/admin/menu_black.svg';
import menu_white from '@/assets/svg/admin/menu_white.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, toggleTheme } from '@/redux/authSlice';
import CategorySidebarAdmin from '../modals/CategorySidebarAdmin';

function HeaderAdmin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const theme = useSelector((state) => state?.auth.theme);

    const dispatch = useDispatch();

    return (
        <div
            className="flex justify-between gap-3 items-center bg-background py-4 px-5
                         transition-colors ease-in-out duration-500"
        >
            <div className="md:hidden">
                <img
                    onClick={() => setIsOpenModal(true)}
                    src={theme === 'light' ? menu_black : menu_white}
                    alt=""
                    className="cursor-pointer"
                />
            </div>
            <div
                className="border text-sm border-background flex gap-2 px-4 
                         w-4/12 max-lg:w-7/12 py-3 rounded-full items-center bg-foreground 
                         transition-colors ease-in-out duration-500 overflow-hidden"
            >
                <img src={search_gray} alt="" className="h-5" />
                <input
                    type="text"
                    className=" placeholder:text-sm outline-none border-none
                                bg-foreground transition-colors ease-in-out duration-500
                                text-text-first "
                    placeholder="Tìm Kiếm..."
                />
            </div>
            <div className="flex gap-6 max-md:gap-3 items-center">
                <img
                    src={theme === 'dark' ? bell_white : bell}
                    alt=""
                    className="h-6 cursor-pointer"
                />
                <img
                    onClick={() => dispatch(toggleTheme())}
                    src={theme === 'dark' ? light_mode : dark_mode}
                    alt=""
                    className="h-5 cursor-pointer transition-transform ease-in-out duration-300"
                />
                <div className="flex items-center text-sm gap-2">
                    <div className="h-10 w-10 flex items-center justify-center text-sm bg-yellow-600 rounded-full">
                        A
                    </div>
                    <div className="text-text-first max-md:hidden">Admin</div>
                </div>
            </div>

            {/* modal */}
            {isOpenModal && (
                <CategorySidebarAdmin
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                />
            )}
        </div>
    );
}

export default HeaderAdmin;
