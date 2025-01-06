/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import {
    faArrowRightFromBracket,
    faChevronRight,
    faCircleUser,
    faLocationDot,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '@/assets/image/avatar.jpg';
import heart_yellow from '@/assets/svg/heart_yellow.svg';
import { logout, setActiveTileCategoryUserInfo } from '@/redux/authSlice';

function MenuNavModals({ openModelMenu, setOpenModelMenu }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //
    const allMenuNav = useSelector((state) => state.menuNav.menuNav);
    const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

    //
    const [openNavmenuChild, setOpenNavmenuChild] = useState(null);
    const [toggleMenuChild, setToggleMenuChild] = useState(false);
    const [isCLoseModalMenuAnimation, setIsCLoseModalMenuAnimation] =
        useState(false);
    const [isAlreadyDirectionRoom, setIsDirectionRoom] = useState(false);
    const [isCloseMenuAnimation, setIsCloseMenuAnimation] = useState(false);

    //hook
    useEffect(() => {
        location.pathname.includes('room')
            ? setIsDirectionRoom(true)
            : setIsDirectionRoom(false);
    }, []);

    // useEffect(() => {
    //     let timeout;

    //     return () => clearTimeout(timeout);
    // }, [toggleMenuChild]);

    //events handle
    const handleClickMenuParent = (id) => {
        if (toggleMenuChild) {
            setIsCloseMenuAnimation(true);
            setTimeout(() => {
                setIsCloseMenuAnimation(false);
                setToggleMenuChild(false);
            }, 300);
        } else {
            setToggleMenuChild(true);
        }
        setOpenNavmenuChild(id);
    };

    const handleCloseModalMenu = () => {
        setIsCLoseModalMenuAnimation(true);
        setTimeout(() => {
            setOpenModelMenu(false);
            setIsCLoseModalMenuAnimation(false);
        }, 500);
    };

    const handleDirectToUserInfo = () => {
        dispatch(setActiveTileCategoryUserInfo('Personal-Information'));
        navigate('/user/Personal-Information');
    };

    return (
        <motion.div
            className={`fixed top-0 w-full left-0 bottom-0 flex bg-gray-800 bg-opacity-40 z-50`}
        >
            <motion.div
                className={`w-6/12 bg-white max-sm:w-10/12 max-xs:w-full overflow-scroll`}
                initial={{ x: '-100%' }}
                animate={{
                    x:
                        openModelMenu && !isCLoseModalMenuAnimation
                            ? '0%'
                            : '-100%',
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="sticky pt-4 z-50 bg-white top-0 w-full">
                    <div className="text-right">
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="mb-2 px-4 text-xl text-yellow-base"
                            onClick={handleCloseModalMenu}
                        />
                    </div>
                    {isAuthenticated ? (
                        <>
                            <div className="flex justify-between items-center mx-4 mb-2">
                                <div className="">
                                    <img
                                        onClick={handleDirectToUserInfo}
                                        src={avatar}
                                        alt=""
                                        className="h-10 rounded-full  border-2 cursor-pointer "
                                    />
                                </div>
                                <button
                                    onClick={() => dispatch(logout())}
                                    className=" text-yellow-base flex items-center justify-center gap-2 font-medium border-yellow-base py-2.5 rounded-md "
                                >
                                    Đăng Xuất
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}
                                    />
                                </button>
                            </div>
                            <Link to="/user/My-favorite">
                                <div className="text-sm text-yellow-600 gap-2 bg-orange-100 py-2 flex items-center justify-center">
                                    <img
                                        src={heart_yellow}
                                        alt=""
                                        className="h-4"
                                    />
                                    Sản phẩm yêu thích
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="  mx-4 flex gap-4">
                                <button className="w-full  text-yellow-base flex items-center justify-center gap-2 border-2 font-medium border-yellow-base py-2.5 rounded-md  mb-4">
                                    <FontAwesomeIcon icon={faCircleUser} />
                                    <Link to="/auth/login">Đăng Nhập</Link>
                                </button>
                                <button className="w-full font-medium flex items-center justify-center bg-yellow-base gap-2 text-white py-2.5 rounded-md  mb-4">
                                    <Link to="/auth/register">Đăng Ký</Link>
                                    <FontAwesomeIcon icon={faCircleUser} />
                                </button>
                            </div>
                            <div className="flex text-sm sticky mt- bg-black text-white px-4 py-3 items-center cursor-pointer justify-center gap-2 ">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>Hà nội</span>
                            </div>
                        </>
                    )}
                </div>

                {/* menu */}
                <div className="relative z-10">
                    {allMenuNav?.map((menu) => (
                        <div
                            key={menu._id}
                            className="transition-all duration-300 ease-in-out  flex justify-between px-4 py-4 border border-zinc-100 font-medium  "
                        >
                            <div className="">
                                <Link
                                    to={
                                        (menu.title === 'About' &&
                                            `/${menu.link}`) ||
                                        (menu.title === 'Blog' &&
                                            `/${menu.link}`) ||
                                        `/room/${menu.link}`
                                    }
                                >
                                    {menu.title}
                                </Link>

                                {/* menu parent */}
                                {openNavmenuChild === menu._id &&
                                    toggleMenuChild && (
                                        <motion.div
                                            initial={{ y: '-5%', opacity: 0 }}
                                            animate={{
                                                y:
                                                    toggleMenuChild &&
                                                    !isCloseMenuAnimation
                                                        ? '0'
                                                        : '-5%',
                                                opacity:
                                                    toggleMenuChild &&
                                                    !isCloseMenuAnimation
                                                        ? 1
                                                        : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col"
                                        >
                                            {/* menu child */}
                                            {menu.children.map((itemChild) => (
                                                <div
                                                    key={itemChild._id}
                                                    className="mx-2 py-2 text-sm"
                                                >
                                                    <Link
                                                        to={`/room/${menu.link}/${itemChild.link}`}
                                                    >
                                                        {itemChild.title}
                                                    </Link>

                                                    {/* menu sub child */}
                                                    {openNavmenuChild ===
                                                        menu._id &&
                                                        toggleMenuChild && (
                                                            <div className="flex flex-col ">
                                                                {itemChild.subChildren.map(
                                                                    (
                                                                        itemSubChild
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                itemSubChild._id
                                                                            }
                                                                            className="font-normal px-2 py-2 text-sm"
                                                                        >
                                                                            <Link
                                                                                to={
                                                                                    isAlreadyDirectionRoom
                                                                                        ? `${menu.link}/${itemChild.link}/${itemSubChild.link}`
                                                                                        : `/room/${menu.link}/${itemChild.link}/${itemSubChild.link}`
                                                                                }
                                                                            >
                                                                                {
                                                                                    itemSubChild.title
                                                                                }
                                                                            </Link>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                            </div>

                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`text-lg animate:iconToggleMenu transition-transform duration-300 ${
                                    toggleMenuChild &&
                                    openNavmenuChild === menu._id
                                        ? 'rotate-90'
                                        : ''
                                } `}
                                onClick={() => handleClickMenuParent(menu._id)}
                            />
                        </div>
                    ))}
                </div>

                {/* footer model */}
            </motion.div>
        </motion.div>
    );
}

export default MenuNavModals;
