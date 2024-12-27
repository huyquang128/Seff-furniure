import { motion } from 'framer-motion';
import close from '@/assets/svg/close.svg';
import discount_code_2 from '@/assets/svg/discount_code_2.svg';
import { useState } from 'react';
import { ListDiscountCode } from '../common/ListDiscountCode';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCartItems,
    setDiscountPrice,
    updateCartItemQuantityAndTotalPrice,
    updateTotalPriceByIdCart,
} from '@/redux/cartSlice';

function DiscountCodeModal({ isShowDiscountModal, setIsShowDiscountModal }) {
    const dispatch = useDispatch();

    //state react
    const [isCloseModalAnimation, setCloseModalAnimation] = useState(false);

    //state redux
    const cartId = useSelector((state) => state.cart?.cartItem._id);
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const userId = useSelector((state) => state.auth?.user?.id);

    //handle Events
    const handleSelectDiscountCode = (code, price) => {
        setCloseModalAnimation(true);
        const formData = {
            cartId,
            totalPriceInCart: totalProductInCart,
            discountPrice: price,
        };

        setTimeout(() => {
            setCloseModalAnimation(false);
            setIsShowDiscountModal(false);
            dispatch(setDiscountPrice(code || ''));
            dispatch(updateTotalPriceByIdCart(formData)).then((data) => {
                if (data.payload.success) {
                    dispatch(getCartItems(userId));
                }
            });
        }, [300]);
    };

    const handleCloseModal = () => {
        setCloseModalAnimation(true);
        setTimeout(() => {
            setCloseModalAnimation(false);
            setIsShowDiscountModal(false);
        }, [300]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: isShowDiscountModal && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className=" fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-20"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity:
                        isShowDiscountModal && !isCloseModalAnimation ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-3/12 max-lg:w-5/12 max-sm:w-10/12 bg-white px-5 flex flex-col rounded-lg items-start text-sm"
            >
                <div className="border-b w-full flex items-center justify-between">
                    <h3 className="text-lg py-2 ">Chọn mã giảm giá</h3>
                    <img
                        onClick={handleCloseModal}
                        src={close}
                        alt=""
                        className="bg-gray-100 h-6 rounded-full p-0.5 cursor-pointer hover:border"
                    />
                </div>
                <div className="py-2 ">Mã giảm giá của shop</div>

                {/* list discount code */}
                <div className="w-full mb-5 h-80 hidden-scrollbar-discount-modal">
                    {ListDiscountCode.map((item, index) => (
                        <div
                            key={index}
                            className={`border p-3 pt-6 rounded-lg mb-4 relative z-10 ${
                                item.expired ? 'opacity-50' : ''
                            }`}
                        >
                            <div
                                className={`absolute z-50 top-1 ${
                                    item.expired
                                        ? 'bg-gray-300'
                                        : 'bg-yellow-base text-white'
                                }  text-xs px-3 -left-3 rounded-sm`}
                            >
                                {item.expired
                                    ? 'Đã hết hạn'
                                    : 'Số lượng có hạn'}
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={discount_code_2}
                                    alt=""
                                    className="h-9"
                                />
                                <div>
                                    <div className="font-medium text-lg">
                                        {item.code}
                                    </div>
                                    <div className="text-text-gray">
                                        {item.date}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-black-base rounded-full"></span>
                                <span>
                                    Giảm{' '}
                                    {item.price_sale.toLocaleString('VN-vn')}₫
                                    giá trị đơn hàng
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-1 h-1 bg-black-base rounded-full"></span>
                                <span>
                                    Mua tối thiểu{' '}
                                    {item.min_buy.toLocaleString('VN-vn')}₫
                                </span>
                            </div>
                            <button
                                disabled={item.expired ? true : false}
                                onClick={() =>
                                    handleSelectDiscountCode(
                                        item.code,
                                        item.price_sale
                                    )
                                }
                                className={`flex justify-end w-full ${
                                    item.expired
                                        ? 'cursor-not-allowed'
                                        : 'hover:brightness-125'
                                }`}
                            >
                                <div className="bg-black-base px-5 py-2 text-white rounded-md">
                                    Áp dụng
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default DiscountCodeModal;
