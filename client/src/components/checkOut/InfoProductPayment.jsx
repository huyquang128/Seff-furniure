import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import cartYellow from '@/assets/svg/cart-yellow.svg';
import arrowDownYellow from '@/assets/svg/arr-down-yellow.svg';
import discountCode from '@/assets/svg/discount-code.svg';

function InfoProductPayment() {
    const [isOpenListProductAnimated, setIsOpenListProductAnimated] =
        useState(false);
    const [isOpenListProduct, setIsOpenListProduct] = useState(true);

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
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
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
                <span className="text-1xl">
                    {totalProductInCart.toLocaleString('vn-VN')} ₫
                </span>
            </div>

            {/* list products cart */}
            <motion.div
                className={`flex flex-col justify-between px-5 max-md:px-0 ${
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
                            className="flex gap-4 items-center border-b py-4 border-gray-100 text-sm"
                        >
                            <img
                                src={product.imageUrl}
                                alt=""
                                className="h-16 rounded-md"
                            />
                            <div className="w-7/12 flex flex-col justify-between ">
                                <h3 className=" ">{product?.nameProduct}</h3>
                                <p className="">
                                    sl:{' '}
                                    {quantityProductInCart[product.productId]}
                                </p>
                                <p className="text-text-gray-second text-xs">
                                    Màu sắc:{' '}
                                    {product.colors
                                        ?.map((color) => color)
                                        .join(', ')}
                                </p>
                            </div>
                            <div className="w-3/12 text-end max-lg:w-4/12">
                                {' '}
                                {priceProductInCart[
                                    product.productId
                                ].toLocaleString('vn-VN')}{' '}
                                ₫
                            </div>
                        </div>
                    ))}
            </motion.div>

            <div className="px-4 py-3 max-md:px-0">
                <div className="flex items-center justify-center border rounded-md overflow-hidden mt-3 mb-3">
                    <input
                        type="text"
                        className="flex-1 py-3 px-3 text-sm"
                        placeholder="Mã giảm giá"
                    />
                    <span className="bg-black text-white text-sm py-3 px-3">
                        Sử dụng
                    </span>
                </div>
                <div className="text-sm text-yellow-base cursor-pointer hover:brightness-110 flex items-center gap-1 mb-5">
                    <img src={discountCode} alt="" className="h-5" />
                    Nhập mã giảm giá nếu có
                </div>

                {/* list discount */}
                <div className="flex flex-wrap justify-start w-full mb-5 h-8 items-center">
                    <div
                        className="discount-code relative text-yellow-base text-sm  
                            text-center font-semibold cursor-pointer w-[110px] h-full flex
                            "
                    >
                        <span className="border px-[5px] w-full py-1 border-yellow-base rounded-sm">
                            Giảm 50.000₫
                        </span>
                    </div>
                </div>

                <div className="col-span-2 rounded-md">
                    <div className="flex justify-between py-3 border-t items-center">
                        <h3 className=" ">Tạm tính</h3>
                        <span className="">
                            {totalProductInCart.toLocaleString('vn-VN')} ₫
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-700 py-3  border-b border-gray-100">
                        <span className="text-sm">Phí vận chuyển</span>
                        <span> --- </span>
                    </div>
                    <div className="flex justify-between font-medium py-5">
                        <span className="text-lg ">Tổng cộng</span>
                        <span className="text-2xl">
                            {totalProductInCart.toLocaleString('vn-VN')} ₫
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoProductPayment;
