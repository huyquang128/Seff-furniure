/* eslint-disable react/prop-types */
import arrowUp from '@/assets/svg/arrow-top.svg';
import close from '@/assets/svg/close.svg';
import cartEmpty from '@/assets/svg/cart-empty.svg';
import recycle from '@/assets/svg/recycle.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteCartItem, getCartItems } from '@/redux/cartSlice';
import { motion } from 'framer-motion';

function CartToolkit({
    floatingToolkitCart,
    setIsOpenToolkitCart,
    isOpenToolkitCart,
    handleCloseModalCart,
    isCloseModalCartAnimation,
}) {
    const userId = useSelector((state) => state.auth?.user?.id);
    const cartItems = useSelector((state) => state.cart?.cartItem);
    const quantityProductInCart = useSelector(
        (state) => state.cart?.quantityProductInCart
    );
    const priceProductInCart = useSelector(
        (state) => state.cart?.priceProductInCart
    );
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const lengthProductInCart = useSelector(
        (state) => state.cart?.cartItem?.products?.length
    );
    const lengthAllProduct = useSelector((state) =>
        state.cart?.cartItem?.products?.reduce(
            (acc, item) => acc + item.quantity,
            0
        )
    );
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
            ref={floatingToolkitCart}
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isOpenToolkitCart && !isCloseModalCartAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsOpenToolkitCart(true)}
            onMouseLeave={handleCloseModalCart}
            // onClick={() => setIsOpenToolkitCart(true)}
            className=" absolute bg-white  shadow-toolkit top-7
                        -right-3 z-50 rounded-md w-96 max-sm:w-80"
        >
            <img
                src={arrowUp}
                className=" absolute right-3 -top-3 h-3 px-3"
                alt=""
            />

            <div className="flex items-center justify-between border-b text-sm border-gray-100 py-2 px-5">
                <h2>Danh sách sản phẩm ({lengthAllProduct})</h2>
                <img
                    src={close}
                    alt=""
                    className="cursor-pointer"
                    onClick={handleCloseModalCart}
                />
            </div>

            <div className="flex flex-col justify-between px-5 mb-4 max-h-[220px] overflow-y-scroll">
                {lengthProductInCart > 0 &&
                    cartItems?.products?.map((product, index) => (
                        <div
                            key={index}
                            className="flex gap-4 border-b py-4 border-gray-100"
                        >
                            <img
                                src={product.imageUrl}
                                alt=""
                                className="h-20"
                            />
                            <div className="w-8/12 flex flex-col justify-between">
                                <h3 className="line-clamp-1">
                                    {product?.nameProduct}
                                </h3>
                                <p className="font-bold">
                                    {quantityProductInCart[product.productId]} x{' '}
                                    {priceProductInCart[
                                        product.productId
                                    ].toLocaleString('vn-VN')}{' '}
                                    đ
                                </p>
                                <p className="text-sm">
                                    Màu sắc:{' '}
                                    {product.colors
                                        ?.map((color) => color)
                                        .join(', ')}
                                </p>
                            </div>
                            <img
                                src={recycle}
                                alt=""
                                className="w-5 cursor-pointer"
                                onClick={() =>
                                    handleDeleteProduct(userId, product?._id)
                                }
                            />
                        </div>
                    ))}
            </div>

            {/* cart empty */}
            {lengthProductInCart === 0 && (
                <div className="flex flex-col justify-center items-center gap-3 px-3 mb-5">
                    <img src={cartEmpty} alt="" />
                    <h2 className="font-semibold">
                        Giỏ hàng của bạn đang trống
                    </h2>
                    <p className="text-center text-sm">
                        Hiện tại giỏ hàng của bạn đang trống. Hãy trải nghiệm
                        các sản phẩm độc đáo của chúng tôi và thêm chúng vào giỏ
                        hàng.
                    </p>
                </div>
            )}

            {/* cart inner quantity product */}
            {lengthProductInCart > 0 && (
                <div className="px-5 mb-5">
                    <div className="flex justify-between mb-3 font-semibold ">
                        <span>Tổng tiền tạm tính:</span>
                        <span>
                            {totalProductInCart.toLocaleString('vn-VN')} đ
                        </span>
                    </div>
                    <div className="flex gap-3 text-sm">
                        <button
                            onClick={() => navigate('/your-cart')}
                            className="border border-black w-6/12 rounded-lg text-black px-3 py-2"
                        >
                            Xem giỏ hàng
                        </button>
                        <button className="bg-black w-6/12 rounded-lg text-white px-3 py-2">
                            Check out
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default CartToolkit;
