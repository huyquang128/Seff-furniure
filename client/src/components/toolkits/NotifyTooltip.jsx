/* eslint-disable react/prop-types */
import arrowUp from '@/assets/svg/arrow-top.svg';
import close from '@/assets/svg/close.svg';
import cartEmpty from '@/assets/svg/cart-empty.svg';
import recycle from '@/assets/svg/recycle.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteCartItem, getCartItems } from '@/redux/cartSlice';
import { motion } from 'framer-motion';

function NotifyTooltip({
    floatingToolkitCart,
    setIsOpenToolkitCart,
    isOpenToolkitCart,
    handleCloseModalCart,
    isCloseModalCartAnimation,
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteProduct = (userId, productId) => {
        dispatch(
            deleteCartItem({
                userId,
                productIds: [productId],
            })
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isOpenToolkitCart && !isCloseModalCartAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsOpenToolkitCart(true)}
            onMouseLeave={handleCloseModalCart}
            // onClick={() => setIsOpenToolkitCart(true)}
        >
            <div className="flex flex-col justify-center items-center gap-3 px-3 mb-5">
                <img src={cartEmpty} alt="" className="h-20 max-xl:h-16" />
                <h2 className="font-semibold">Chưa có thông báo nào</h2>
            </div>
        </motion.div>
    );
}

export default NotifyTooltip;
