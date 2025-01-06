import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import discount_code from '@/assets/svg/discount-code.svg';
import { motion } from 'framer-motion';
import cartYellow from '@/assets/svg/cart-yellow.svg';
import arrowDownYellow from '@/assets/svg/arr-down-yellow.svg';
// import discount_code from '@/assets/svg/discount-code.svg';
import DiscountCodeModal from '../modals/DicountCodeModal';
import close_white from '@/assets/svg/close_white.svg';
import discount_code_3 from '@/assets/svg/discount_code_3.svg';
import { ListDiscountCode } from '../common/ListDiscountCode';
import arrRight from '@/assets/svg/arr-right.svg';
import { setDiscountPrice } from '@/redux/cartSlice';

function InfoProductPayment() {
    const dispatch = useDispatch();
    const location = useLocation();
    const redirectCurrent = location.pathname;
    //
    const [isOpenListProductAnimated, setIsOpenListProductAnimated] =
        useState(false);
    const [isOpenListProduct, setIsOpenListProduct] = useState(true);
    const [isShowDiscountModal, setIsShowDiscountModal] = useState(false);

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
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const discountCode = useSelector((state) => state.cart.discountCode);

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
                {/* <span className="text-1xl">
                    {totalProductInCart.toLocaleString('vn-VN')} ₫
                </span> */}
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

            {/* total price and discount code */}
            <div className="px-4 py-2 ">
                <span className="text-sm text-gray-600">
                    Nhập mã giảm giá nếu có
                </span>
                <div className="flex items-center justify-center border rounded-md overflow-hidden mt-3">
                    <input
                        type="text"
                        className="flex-1 outline-none px-3 text-sm"
                        placeholder="mã giảm giá"
                    />
                    <span className="bg-black text-white text-sm py-3 px-3">
                        Sử dụng
                    </span>
                </div>
            </div>

            <div
                onClick={() => setIsShowDiscountModal(true)}
                className="px-4 text-sm mb-3 flex items-center gap-1 cursor-pointer"
            >
                <img src={discount_code} alt="" />
                <span className="text-yellow-base hover:brightness-110">
                    Xem thêm mã giảm giá
                </span>
            </div>

            {ListDiscountCode.map((item, index) => {
                const result = item.code === discountCode && (
                    <div
                        onClick={() => setIsShowDiscountModal(true)}
                        key={index}
                        className="px-5 flex flex-wrap justify-start w-full mb-5 h-8 items-center"
                    >
                        <div
                            className="discount-code relative text-yellow-base text-sm
                                text-center font-semibold cursor-pointer w-[120px] h-full flex
                                "
                        >
                            <span className="border  w-full py-1 border-yellow-base rounded-sm">
                                Giảm {item.price_sale.toLocaleString('VN-vn')}đ
                            </span>
                        </div>
                    </div>
                );
                return result;
            })}

            {/* modal discount code */}
            {isShowDiscountModal && (
                <DiscountCodeModal
                    isShowDiscountModal={isShowDiscountModal}
                    setIsShowDiscountModal={setIsShowDiscountModal}
                />
            )}

            <div className="flex justify-between items-center px-4 text-gray-700 py-3">
                <div className="text-sm flex flex-col  gap-2">
                    <span>Mã giảm giá</span>
                    {ListDiscountCode.map((item, index) => {
                        const result = item.code === discountCode && (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={discount_code_3}
                                    alt=""
                                    className="h-4 translate-y-[1px]"
                                />
                                <div className="text-xs text-yellow-base">
                                    {item.code}
                                </div>
                                <img
                                    onClick={() =>
                                        dispatch(setDiscountPrice(''))
                                    }
                                    src={close_white}
                                    alt=""
                                    className="bg-gray-300 h-4 rounded-full p-[1px] cursor-pointer hover:border"
                                />
                            </div>
                        );
                        return result;
                    })}
                </div>

                {discountCode
                    ? ListDiscountCode.map((item, index) => {
                          const result = item.code === discountCode && (
                              <span key={index}>
                                  - {item.price_sale.toLocaleString('VN-vn')}₫
                              </span>
                          );

                          return result;
                      })
                    : 0 + '₫'}
            </div>
            <div className="flex justify-between items-center text-sm px-4">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
            </div>
            <div className="flex justify-between px-3 py-5">
                <span className="text-lg font-semibold">Tổng cộng</span>
                <span className="font-bold text-lg">
                    {totalProductInCart.toLocaleString('vn-VN')}₫
                </span>
            </div>
        </div>
    );
}

export default InfoProductPayment;
