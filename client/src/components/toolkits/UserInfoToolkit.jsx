/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { ListCategoryUser } from '../user/ListCategoryUser';
import { setActiveTileCategoryUserInfo } from '@/redux/authSlice';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function UserInfoToolkit({
    isShowCategoryUserOption,
    setShowCategoryUserOption,
    isActCloseToolkitUserInfo,
    setActCloseToolkitUserInfo,
}) {
    const isActiveCategoryUserInfoTitle = useSelector(
        (state) => state?.auth.isActiveCategoryUserInfoTitle
    );
    const dispatch = useDispatch();
    const ref = useRef();

    const handleClickOutSide = (event) => {
        if (!ref.current.contains(event.target)) {
            setActCloseToolkitUserInfo(true);
            setTimeout(() => {
                setActCloseToolkitUserInfo(false);
                setShowCategoryUserOption(false);
            }, 500);
        }
    };

    return (
        <div
            className="absolute w-full text-sm bg-models min-h-screen"
            onClick={handleClickOutSide}
        >
            <motion.div
                initial={{ clipPath: 'inset(0 0 100% 0)' }} // Bắt đầu bị ẩn
                animate={{
                    clipPath:
                        isShowCategoryUserOption && !isActCloseToolkitUserInfo
                            ? 'inset(0 0 0% 0)'
                            : 'inset(0 0 100% 0)',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-white py-3 rounded-b-lg px-3"
                ref={ref}
            >
                {ListCategoryUser.map((category, index) => (
                    <div
                        key={index}
                        className={`${
                            isActiveCategoryUserInfoTitle === category.link
                                ? 'bg-orange-100'
                                : ''
                        } flex items-center gap-3 py-3  w-full px-5 rounded-lg `}
                        onClick={() =>
                            dispatch(
                                setActiveTileCategoryUserInfo(category.link)
                            )
                        }
                    >
                        <img
                            src={
                                isActiveCategoryUserInfoTitle === category.link
                                    ? category.svg_yellow
                                    : category.svg
                            }
                            alt=""
                            className="h-5 -translate-y-[2px]"
                        />
                        <div
                            className={`${
                                isActiveCategoryUserInfoTitle === category.link
                                    ? 'text-yellow-600'
                                    : ''
                            }`}
                        >
                            <Link to={category.link}>{category.title}</Link>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default UserInfoToolkit;
