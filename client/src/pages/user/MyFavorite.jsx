import { useDispatch, useSelector } from 'react-redux';
import recycle from '@/assets/svg/recycle.svg';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import recycle_red_bold from '@/assets/svg/recycle_red_bold.svg';
import {
    clearProductFavoriteActive,
    deleteAllFavoriteProduct,
    deleteFavoriteProduct,
    getFavoriteProduct,
} from '@/redux/favorite';
import heart_yellow from '@/assets/svg/heart_yellow.svg';

function MyFavorite() {
    const dispatch = useDispatch();
    const ref = useRef();

    //state redux
    const userId = useSelector((state) => state?.auth?.user?.id);
    const favoriteProduct = useSelector(
        (state) => state?.favoriteProducts?.favoriteProduct
    );

    //state react
    const [isHideAct, setIsHideAct] = useState(null);
    const [isHideActAnimation, setIsHideActAnimation] = useState(false);

    //hook
    useEffect(() => {
        if (userId) dispatch(getFavoriteProduct(userId));
    }, [dispatch, userId]);

    //handle events
    const handleLeaveProduct = (id) => {
        setIsHideActAnimation(true);
        setTimeout(() => {
            setIsHideActAnimation(false);
            setIsHideAct(null);
        }, 200);
    };

    const handleHoverProduct = (id) => {
        if (ref.current) {
            setIsHideAct(id);
            console.log(true);
        }
    };

    const handleRemoveProduct = (id) => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', id);
        dispatch(clearProductFavoriteActive(id));
        dispatch(deleteFavoriteProduct(formData)).then((data) => {
            if (data.payload.success) {
                dispatch(getFavoriteProduct(userId));
            }
        });
    };

    const handleDeleteAll = () => {
        if (userId) {
            dispatch(deleteAllFavoriteProduct(userId));
            dispatch(getFavoriteProduct(userId));
        }
    };

    return (
        <div className="grid grid-cols-4 gap-y-10 gap-5 max-lg:grid-cols-2  w-full max-sm:grid-cols-1 p-1">
            <div className="col-span-4 flex justify-between items-center">
                <h1 className="text-xl">Sản phẩm yêu thích</h1>
                {favoriteProduct && favoriteProduct?.products?.length > 0 && (
                    <button
                        onClick={handleDeleteAll}
                        className="  flex text-sm hover:outline hover:outline-1 hover:outline-red-200 items-center gap-2 bg-red-50 py-2 px-4 rounded-md"
                    >
                        <img
                            src={recycle_red_bold}
                            alt=""
                            className="-translate-y-[2px] h-4"
                        />
                        <span className="text-red-600 ">Xóa tất cả</span>
                    </button>
                )}
            </div>

            {/* list products */}
            <div className="col-span-4 grid grid-cols-3 w-full gap-x-5 gap-y-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {favoriteProduct && favoriteProduct?.products?.length > 0 ? (
                    favoriteProduct?.products?.map((item) => (
                        <div
                            key={item._id}
                            className="relative cursor-pointer"
                            // onMouseEnter={() => handleHoverProduct(item._id)}
                            onMouseMove={() => handleHoverProduct(item._id)}
                            onMouseLeave={() => handleLeaveProduct(item._id)}
                        >
                            <div ref={ref} className="relative max-lg:w-full ">
                                <img
                                    src={item?.colors[0]?.images[0] || ''}
                                    alt=""
                                    className=" max-lg:w-full object-cover object-center rounded-md mb-3"
                                />
                                {/* act add to cart */}
                                <motion.div
                                    initial={{
                                        y: '50%',
                                        x: '50%',
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y:
                                            isHideAct === item._id &&
                                            !isHideActAnimation
                                                ? '0%'
                                                : '50%',
                                        x: '50%',
                                        opacity:
                                            isHideAct === item._id &&
                                            !isHideActAnimation
                                                ? 1
                                                : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`${
                                        isHideAct === item._id ? '' : 'hidden'
                                    } absolute bottom-0 w-8/12 text-center bg-white px-2 py-3 rounded-md right-1/2
                                    text-sm mb-4 shadow-model-1 z-10`}
                                >
                                    Thêm vào giỏ hàng
                                </motion.div>

                                {/* class opacity */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: isHideAct === item._id ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`${
                                        isHideAct === item._id ? '' : 'hidden'
                                    } absolute top-0 right-0 bottom-0 left-0 bg-models`}
                                ></motion.div>
                            </div>

                            {/* act remove product */}
                            <motion.div
                                initial={{ y: '-100%', opacity: '0' }}
                                animate={{
                                    y:
                                        isHideAct === item._id &&
                                        !isHideActAnimation
                                            ? '0%'
                                            : '-100%',
                                    opacity:
                                        isHideAct === item._id &&
                                        !isHideActAnimation
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                onClick={() => handleRemoveProduct(item._id)}
                                className={`${
                                    isHideAct === item._id ? '' : 'hidden'
                                } absolute bg-white rounded-full p-2.5 right-0 top-0 mr-4 mt-4 shadow-model-1`}
                            >
                                <img src={recycle} alt="" className="h-4" />
                            </motion.div>
                            <div className="">
                                <div className="text-xs">
                                    {item.subChildMenu}
                                </div>
                                <div>{item.name}</div>
                                <div className="flex gap-3">
                                    <span className="text-sm">
                                        {item.sale.toLocaleString('VN-vn')}đ
                                    </span>
                                    <span className="text-sm line-through text-text-gray">
                                        {item.price.toLocaleString('VN-vn')}đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full col-span-4 bg-orange-100 flex gap-3 p-5 rounded-sm">
                        <img src={heart_yellow} alt="" className="h-5" />
                        <div className="text-yellow-600 text-sm ">
                            Bạn chưa có sản phẩm yêu thích nào.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyFavorite;
