import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import cartYellow from '@/assets/svg/cart-yellow.svg';
import arrowDownYellow from '@/assets/svg/arr-down-yellow.svg';
// import discount_code from '@/assets/svg/discount-code.svg';

import arrRight from '@/assets/svg/arr-right.svg';
import DiscountPaymentCommon from '../common/DiscountPaymentCommon';

function InfoProductPayment() {
    const location = useLocation();
    const redirectCurrent = location.pathname;
    //
    const [isOpenListProductAnimated, setIsOpenListProductAnimated] =
        useState(false);
    const [isOpenListProduct, setIsOpenListProduct] = useState(true);

    //state redux
    const lengthProductInCart = useSelector(
        (state) => state.cart?.cartItem?.products?.length
    );
    const cartItems = useSelector((state) => state.cart?.cartItem);
    const quantityProductInCart = useSelector(
        (state) => state.cart?.quantityProductInCart
    );
    const priceProductInCart = useSelector(
        (state) => state.cart?.priceProductInCart
    );

    const toggleListProduct = () => {
        setIsOpenListProductAnimated(true);

        setTimeout(() => {
            setIsOpenListProductAnimated(false);
            setIsOpenListProduct(!isOpenListProduct);
        }, 500);
    };

    return (
        <div
            className="w-5/12 pt-[56px] pl-[31px] border-l max-lg:pl-4 max-md:pl-0 max-md:w-full 
                    max-md:border-none max-md:pt-3"
        >
            <h1 className="md:hidden font-medium text-yellow-base mb-3 text-[28px] ">
                <Link to="/">HOMECOR.</Link>
            </h1>
            <div className="flex text-xs items-center mb-3 md:hidden">
                <Link to="/your-cart">Giỏ hàng</Link>
                <img src={arrRight} alt="" />
                <Link to="/cart/checkout-step-1">
                    <span
                        className={`${
                            redirectCurrent.includes('checkout-step-1')
                                ? 'text-yellow-base'
                                : ''
                        }`}
                    >
                        Thông tin giao hàng
                    </span>
                </Link>
                <img src={arrRight} alt="" />

                <Link to="/cart/checkout-step-2">
                    <span
                        className={`${
                            redirectCurrent.includes('checkout-step-2')
                                ? 'text-yellow-base'
                                : ''
                        } `}
                    >
                        Phương thức thanh toán
                    </span>
                </Link>
            </div>
            <div className="md:hidden flex flex-nowrap justify-between  py-5 border-t">
                <div
                    onClick={toggleListProduct}
                    className="flex items-center gap-2 "
                >
                    <img
                        src={cartYellow}
                        alt="cart"
                        className="h-5 -translate-y-[1.5px]"
                    />
                    <span className="flex items-center  text-yellow-base text-sm">
                        <span className="min-w-[170px]">
                            Hiển thị thông tin đơn hàng
                        </span>
                        <img src={arrowDownYellow} alt="" className="filter " />
                    </span>
                </div>
            </div>

            {/* list products cart */}
            <motion.div
                className={`flex flex-col justify-between max-md:px-0 ${
                    isOpenListProduct ? 'block' : 'max-md:hidden'
                }`}
                initial={{ opacity: 0 }}
                animate={{
                    opacity:
                        isOpenListProduct && !isOpenListProductAnimated ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                {lengthProductInCart > 0 &&
                    cartItems?.products?.map((product, index) => (
                        <div
                            key={index}
                            className="border-b py-4 border-gray-100 text-sm"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={product.imageUrl}
                                    alt=""
                                    className="h-16 rounded-md"
                                />
                                <div className="w-7/12 flex flex-col justify-between ">
                                    <h3 className=" ">
                                        {product?.nameProduct}
                                    </h3>
                                    <p className="">
                                        sl:{' '}
                                        {
                                            quantityProductInCart[
                                                product.productId
                                            ]
                                        }
                                    </p>
                                    <p className="text-text-gray-second text-xs">
                                        Màu sắc:{' '}
                                        {product.colors
                                            ?.map((color) => color)
                                            .join(', ')}
                                    </p>
                                </div>
                                <div className="w-3/12 max-lg:hidden text-end max-lg:w-4/12">
                                    {' '}
                                    {priceProductInCart[
                                        product.productId
                                    ].toLocaleString('vn-VN')}{' '}
                                    ₫
                                </div>
                            </div>
                            <div className="lg:hidden mt-3">
                                {' '}
                                {priceProductInCart[
                                    product.productId
                                ].toLocaleString('vn-VN')}{' '}
                                ₫
                            </div>
                        </div>
                    ))}
            </motion.div>

          
            <DiscountPaymentCommon />
        </div>
    );
}

export default InfoProductPayment;
