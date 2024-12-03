import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MenuNavModel from '../modals/menuNavModals';
import { useDispatch, useSelector } from 'react-redux';
import { useFloating } from '@floating-ui/react';
import CartToolkit from '../toolkits/cartToolkits';
import FadeLoader from 'react-spinners/FadeLoader';
import { getCartItems } from '@/redux/cartSlice';
import { motion } from 'framer-motion';
import UserInfoToolkit from '../toolkits/userInfoToolkit';
import { ListCategoryUser } from '../user/ListCategoryUser';
import { getAllOrder } from '@/redux/orderSlice';
import SearchProductToolkit from '../toolkits/SearchProductToolkit';
import {
    searchProductsByKeyword,
    setProductsSearch,
} from '@/redux/productSlice';
import FavoriteToolkit from '../toolkits/FavoriteToolkit';
import {
    checkAuth,
    login,
    logout,
    setActiveTileCategoryUserInfo,
} from '@/redux/authSlice';
import { debounce } from 'lodash';

import arr_top_bold from '@/assets/svg/arr-top-bold.svg';
import cart from '@/assets/svg/cart.svg';
import heart from '@/assets/svg/heart.svg';
import user from '@/assets/svg/user.svg';
import search from '@/assets/svg/search.svg';
import menu from '@/assets/svg/menu.svg';
import arrowUp from '@/assets/svg/arrow-top.svg';
import avatar from '@/assets/image/avatar.jpg';

function HeaderHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const ref = useRef();

    //state react
    const [isSize, setIsSize] = useState(770);
    const [refElement, setRefElement] = useState(null);
    const [keywords, setKeywords] = useState('');

    //state redux
    const userStore = useSelector((state) => state?.auth.user);
    const userId = useSelector((state) => state.auth.user?.id);
    const lengthProductInCart = useSelector(
        (state) => state.cart.cartItem?.products?.length
    );
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const lengthAllProduct = useSelector((state) =>
        state.cart?.cartItem?.products?.reduce(
            (acc, item) => acc + item.quantity,
            0
        )
    );
    const urlImgAvatar = useSelector((state) => state?.auth.urlImgAvatar);

    // state show - close modals, toolkit
    const [isShowCategoryUserOption, setShowCategoryUserOption] =
        useState(false);
    const isActiveCategoryUserInfoTitle = useSelector(
        (state) => state?.auth.isActiveCategoryUserInfoTitle
    );
    const [openModelMenu, setOpenModelMenu] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenTooltipHeart, setIsOpenTooltipHeart] = useState(false);
    const [isOpenToolkitCart, setIsOpenToolkitCart] = useState(false);
    const [isCloseToolkitAnimation, setIsCloseToolkitAnimation] =
        useState(false);
    const [isCloseModalCartAnimation, setIsCloseModalCartAnimation] =
        useState(false);
    const [isActCloseToolkitUserInfo, setActCloseToolkitUserInfo] =
        useState(false);
    const [isShowSearchProductsToolkit, setIsShowSearchProductsToolkit] =
        useState(false);
    const [isShowTooltipAnimation, setShowTooltipAnimation] = useState(false);

    //hooks
    useEffect(() => {
        setTimeout(() => {
            if (userId) {
                dispatch(getCartItems(userId));
            }
        }, 500);
    }, [totalProductInCart, lengthProductInCart]);

    useEffect(() => {
        window.addEventListener('resize', function () {
            setIsSize(window.innerWidth);
        });
        return () => {
            document.removeEventListener('resize', function () {});
        };
    }, [isSize]);

    useEffect(() => {
        if (userId) dispatch(getAllOrder(userId));
    }, [dispatch]);

    //debounce
    const debounceSearchProducts = debounce(async (searchTerm) => {
        if (searchTerm.trim() === '') {
            dispatch(setProductsSearch([]));
            return;
        }
        try {
            dispatch(searchProductsByKeyword(searchTerm));
        } catch (error) {
            console.error(error);
        }
    }, 500);

    useEffect(() => {
        return () => {
            debounceSearchProducts.cancel();
        };
    }, []);

    //handle events
    const handleCloseToolkitUser = () => {
        setIsCloseToolkitAnimation(true);

        setTimeout(() => {
            setIsOpen(false);
            setIsCloseToolkitAnimation(false);
        }, 500);
    };

    const handleCloseModalCart = () => {
        setIsCloseModalCartAnimation(true);
        setTimeout(() => {
            setIsOpenToolkitCart(false);
            setIsCloseModalCartAnimation(false);
        }, 400);
    };

    const handleShowToolkitUserInfo = () => {
        if (isShowCategoryUserOption) {
            setActCloseToolkitUserInfo(true);
            setTimeout(() => {
                setActCloseToolkitUserInfo(false);
                setShowCategoryUserOption(false);
            }, 500);
        } else {
            setShowCategoryUserOption(true);
        }
    };

    const handleFocusSearchInput = () => {
        setRefElement(ref.current);
        setIsShowSearchProductsToolkit(true);
    };

    const handleCloseTooltipHeart = () => {
        setShowTooltipAnimation(true);

        setTimeout(() => {
            setShowTooltipAnimation(false);
            setIsOpenTooltipHeart(false);
        }, 300);
    };

    const handleChangeValueSearchProducts = (e) => {
        const value = e.target.value;
        setKeywords(value);
        debounceSearchProducts(value);
    };

    // floating ui
    const { reference, floating } = useFloating({
        placement: 'bottom',
    });

    const { reference: referenceCart, floating: floatingToolkitCart } =
        useFloating({
            placement: 'bottom',
        });

    return (
        <div
            className={`max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 ${
                                isAuthenticated ? 'py-0' : 'py-2.5'
                            } max-md:py-0 max-md:relative bg-white 
                            flex items-center justify-between`}
        >
            <img
                src={menu}
                alt=""
                className="h-5   max-md:block md:hidden"
                onClick={() => setOpenModelMenu(true)}
            />
            <div
                className="flex items-center max-md:ml-12 max-md:py-4 cursor-pointer"
                onClick={() => navigate('/')}
            >
                <h3
                    className="text-2xl font-semibold text-yellow-base brightness-110 font-sans 
                                max-sm:text-2xl "
                >
                    HOMECOR.
                </h3>
            </div>

            {/* search */}
            <div
                className="w-5/12 relative max-md:absolute max-md:bottom-[-50px] max-md:right-0 
                            max-md:left-0 max-md:w-full py-3"
            >
                {location.pathname.includes('user') && isSize <= 769 ? (
                    <>
                        <div className="px-3 py-3 border-b border-gray-100 bg-white">
                            {ListCategoryUser.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={handleShowToolkitUserInfo}
                                    className="flex justify-between items-center"
                                >
                                    {isActiveCategoryUserInfoTitle ===
                                        category.link && (
                                        <>
                                            <div
                                                className="text-sm flex gap-1 items-center font-medium 
                                                          text-yellow-base"
                                            >
                                                <img
                                                    src={category.svg_yellow}
                                                    alt=""
                                                    className="h-5 -translate-y-[2px]"
                                                />
                                                {category.title}
                                            </div>
                                            <img src={arr_top_bold} alt="" />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isShowCategoryUserOption && (
                            <UserInfoToolkit
                                isShowCategoryUserOption={
                                    isShowCategoryUserOption
                                }
                                setShowCategoryUserOption={
                                    setShowCategoryUserOption
                                }
                                isActCloseToolkitUserInfo={
                                    isActCloseToolkitUserInfo
                                }
                                setActCloseToolkitUserInfo={
                                    setActCloseToolkitUserInfo
                                }
                            />
                        )}
                    </>
                ) : (
                    <div ref={ref} className="relative">
                        {/* search products */}
                        <input
                            onFocus={handleFocusSearchInput}
                            type="text"
                            className="border-b-[1px] text-sm max-md:bg-gray-100 border-black-base outline-none text-black-base w-full 
                                    py-2 max-md:px-16 max-md:py-3  max-md:border-hidden max-md:text-sm 
                                     placeholder:text-black-text"
                            placeholder="Bạn đang tìm sản phầm nào?"
                            value={keywords || ''}
                            onChange={handleChangeValueSearchProducts}
                        />
                        <img
                            src={search}
                            alt=""
                            className="h-5 max-md:h-4 cursor-pointer absolute right-0 bottom-1 max-md:bottom-3.5 max-md:left-8"
                        />
                        {isShowSearchProductsToolkit && (
                            <SearchProductToolkit
                                isShowSearchProductsToolkit={
                                    isShowSearchProductsToolkit
                                }
                                setIsShowSearchProductsToolkit={
                                    setIsShowSearchProductsToolkit
                                }
                                refElement={refElement}
                                keywords={keywords}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="flex gap-10 max-sm:gap-5 px-2 items-center relative">
                {/* user login */}
                {isAuthenticated ? (
                    <div
                        ref={reference}
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={handleCloseToolkitUser}
                        className="py-5 bg-transparent"
                    >
                        <img
                            src={urlImgAvatar}
                            alt=""
                            onMouseEnter={() => setIsOpen(true)}
                            // onMouseLeave={handleCloseToolkitUser}
                            className="h-12 w-12 object-cover max-md:hidden rounded-full  border-2 cursor-pointer"
                        />
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        isOpen && !isCloseToolkitAnimation
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 0.4 }}
                                ref={floating}
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={handleCloseToolkitUser}
                                className={`${
                                    isAuthenticated && 'right-[180px]'
                                } `}
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    top: `${urlImgAvatar ? '88px' : ''}`,
                                    right: `${
                                        urlImgAvatar ? '130px' : '100px'
                                    }`,
                                    color: 'black',
                                    paddingTop: '30px',
                                    borderRadius: '12px',
                                    zIndex: '10',
                                    width: '250px',
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                }}
                            >
                                <div className="flex flex-col justify-center items-center">
                                    <img
                                        src={urlImgAvatar}
                                        alt=""
                                        className="h-16 w-16 max-md:hidden rounded-full mb-4 border-2 cursor-pointer object-cover"
                                    />
                                    <span className="mb-4 text-black-base">
                                        {userStore?.lastName +
                                        userStore?.firstName
                                            ? userStore?.lastName +
                                              userStore?.firstName
                                            : userStore?.email}
                                    </span>
                                </div>
                                <div className="flex justify-center text-sm flex-col px-6 gap-4 text-white-text cursor-pointer ">
                                    <p className="cursor-pointer">
                                        <Link to="/user/Personal-Information">
                                            Thông tin cá nhân
                                        </Link>
                                    </p>
                                    <p className="mb-4 cursor-pointer">
                                        Thông tin đơn hàng
                                    </p>
                                    <p
                                        onClick={() => dispatch(logout())}
                                        className="border-t pt-5 pb-3 cursor-pointer font-medium hover:text-opacity-80"
                                    >
                                        Đăng xuất
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <img
                        src={user}
                        alt=""
                        className="h-5 max-sm:h-4 max-md:hidden cursor-pointer"
                        onClick={() => navigate('/auth/login')}
                    />
                )}

                <div
                    onMouseEnter={() => setIsOpenTooltipHeart(true)}
                    onMouseLeave={handleCloseTooltipHeart}
                    className="relative max-sm:hidden"
                >
                    <Link to="/user/My-favorite">
                        <img
                            src={heart}
                            alt=""
                            className="h-5 max-sm:h-4 cursor-pointer"
                        />
                        <span className="absolute top-[-16px] bg-red-500 cursor-pointer flex justify-center text-white py-1 px-1.5 text-[9.5px] max-md:text-[8.5px] rounded-full right-[-12px] min-w-2 max-w-5">
                            0
                        </span>
                    </Link>
                </div>
                {isOpenTooltipHeart && (
                    <FavoriteToolkit
                        isOpenTooltipHeart={isOpenTooltipHeart}
                        isShowTooltipAnimation={isShowTooltipAnimation}
                    />
                )}

                <div className="relative">
                    <img
                        ref={referenceCart}
                        src={cart}
                        alt=""
                        className="h-5 cursor-pointer p-0 "
                        onMouseEnter={() => setIsOpenToolkitCart(true)}
                        onMouseLeave={() => setIsOpenToolkitCart(false)}
                    />
                    <span className="absolute top-[-16px] bg-red-500 cursor-pointer flex justify-center text-white py-1 px-1.5 text-[9.5px] max-md:text-[8.5px rounded-full right-[-12px] min-w-2 max-w-5">
                        {lengthAllProduct || 0}
                    </span>
                    {isOpenToolkitCart && (
                        <CartToolkit
                            floatingToolkitCart={floatingToolkitCart}
                            setIsOpenToolkitCart={setIsOpenToolkitCart}
                            isOpenToolkitCart={isOpenToolkitCart}
                            handleCloseModalCart={handleCloseModalCart}
                            isCloseModalCartAnimation={
                                isCloseModalCartAnimation
                            }
                        />
                    )}
                </div>
            </div>

            {openModelMenu && (
                <MenuNavModel
                    openModelMenu={openModelMenu}
                    setOpenModelMenu={setOpenModelMenu}
                />
            )}
        </div>
    );
}

export default HeaderHome;
