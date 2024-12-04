import { useDispatch, useSelector } from 'react-redux';
import recycle from '@/assets/svg/recycle.svg';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    clearProductFavoriteActive,
    deleteFavoriteProduct,
    getFavoriteProduct,
} from '@/redux/favorite';
function MyFavorite() {
    const dispatch = useDispatch();

    //state redux
    const userId = useSelector((state) => state?.auth.user?.id);
    const favoriteProduct = useSelector(
        (state) => state?.favoriteProducts.favoriteProduct
    );

    //state react
    const [isHideAct, setIsHideAct] = useState(null);
    const [isHideActAnimation, setIsHideActAnimation] = useState(false);

    //hook
    useEffect(() => {
        dispatch(getFavoriteProduct(userId));
    }, [dispatch]);

    //handle events
    const handleHoverProduct = (id) => {
        setIsHideAct(id);
    };

    const handleLeaveProduct = () => {
        setIsHideActAnimation(true);
        setTimeout(() => {
            setIsHideActAnimation(false);
            setIsHideAct(null);
        }, 300);
    };

    const handleRemoveProduct = (id) => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', id);
        dispatch(clearProductFavoriteActive(id));
        dispatch(deleteFavoriteProduct(formData));
        dispatch(getFavoriteProduct(userId));
    };

    return (
        <div className="grid grid-cols-4 gap-y-10 gap-5 max-lg:grid-cols-2  w-full max-sm:grid-cols-1">
            {favoriteProduct?.products?.map((item) => (
                <div key={item._id} className="relative cursor-pointer">
                    <div
                        onMouseEnter={() => handleHoverProduct(item._id)}
                        onMouseLeave={() => handleLeaveProduct}
                        className="relative max-lg:w-full"
                    >
                        <img
                            src={item?.colors[0]?.images[0] || ''}
                            alt=""
                            className="h-80 w-72 max-lg:w-full object-cover object-center rounded-md mb-3"
                        />

                        {/* act add to cart */}
                        <motion.div
                            initial={{ y: '100%', x: '50%' }}
                            animate={{
                                y:
                                    isHideAct === item._id &&
                                    !isHideActAnimation
                                        ? '0%'
                                        : '100%',
                                x: '50%',
                            }}
                            transition={{ duration: 0.3 }}
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
                            transition={{ duration: 0.3 }}
                            className={`${
                                isHideAct === item._id ? '' : 'hidden'
                            } absolute top-0 right-0 bottom-0 left-0 bg-models`}
                        ></motion.div>
                    </div>
                    <div>
                        <div className="text-xs">{item.subChildMenu}</div>
                        <div>{item.name}</div>
                        <div>
                            <span className="text-sm">300.000đ</span>
                        </div>
                    </div>

                    {/* act remove product */}
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{
                            y: isHideAct === item._id ? '0%' : '-100%',
                        }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleRemoveProduct(item._id)}
                        className={`${
                            isHideAct === item._id ? '' : 'hidden'
                        } absolute bg-white rounded-full p-2.5 right-0 top-0 mr-4 mt-4 shadow-model-1`}
                    >
                        <img src={recycle} alt="" className="h-4" />
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

export default MyFavorite;
