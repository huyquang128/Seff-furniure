import close from '@/assets/svg/close.svg';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import discount_code from '@/assets/svg/discount-code.svg';

function PaymentCartModals({ isOpenModalsPayment, setIsOpenModalsPayment }) {
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const navigate = useNavigate();
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);
    const handleCloseModalPayment = () => {
        setIsCloseModalAnimation(true);

        setTimeout(() => {
            setIsOpenModalsPayment(false);
            setIsCloseModalAnimation(false);
        }, 500);
    };
    return (
        <motion.div className="fixed top-0 bottom-0 right-0 left-0 flex  bg-models z-20">
            <motion.div
                className="w-5/12 bg-white max-sm:w-10/12 fixed right-0 h-full opacity-1 opacity-1"
                initial={{ x: 350 }}
                animate={{
                    x: isOpenModalsPayment && !isCloseModalAnimation ? 0 : 350,
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between px-3 py-4">
                    <h3 className="font-bold text-xl">Thanh toán</h3>
                    <img src={close} alt="" onClick={handleCloseModalPayment} />
                </div>
                <div className="flex justify-between py-3 px-4 border border-gray-100 items-center">
                    <h3 className="font-semibold ">Tạm tính</h3>
                    <span className="font-bold text-lg">
                        {totalProductInCart.toLocaleString('vn-VN')} đ
                    </span>
                </div>
                <div className="px-4 py-3 ">
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
                            Apply
                        </span>
                    </div>
                </div>
                <div
                    // onClick={() => setIsShowDiscountModal(true)}
                    className="px-4 text-sm mb-3 flex items-center gap-1 cursor-pointer"
                >
                    <img src={discount_code} alt="" />
                    <span className="text-yellow-base hover:brightness-110">
                        Xem thêm mã giảm giá
                    </span>
                </div>
                <div className="flex justify-between px-4 text-gray-700 py-3  border-b border-gray-100">
                    <span className="text-sm">Phí vận chuyển</span>
                    <span>20.000đ</span>
                </div>
                <div className="flex justify-between px-3 py-5">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="font-bold text-lg">
                        {totalProductInCart.toLocaleString('vn-VN')} đ
                    </span>
                </div>
                <div className="mx-4">
                    <button
                        onClick={() => navigate('/cart/checkout-step-1')}
                        className="bg-black text-white w-full mb-4 px-7 hover:brightness-150 py-3 rounded-md "
                    >
                        Thanh toán
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default PaymentCartModals;
