import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import bag from '@/assets/svg/bag.svg';

function OrderCompletedModal({
    showOrderCompletedModal,
    setShowOrderCompletedModal,
}) {
    const [
        isOrderCompletedModalsAnimation,
        setIsOrderCompletedModalsAnimation,
    ] = useState(false);
    const navigate = useNavigate();

    const handleClickToHome = () => {
        setIsOrderCompletedModalsAnimation(true);
        setTimeout(() => {
            setIsOrderCompletedModalsAnimation(false);
            setShowOrderCompletedModal(false);
            navigate('/');
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    showOrderCompletedModal && !isOrderCompletedModalsAnimation
                        ? 1
                        : 0,
            }}
            transition={{ duration: 0.3 }}
            className=" fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-20"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity:
                        showOrderCompletedModal &&
                        !isOrderCompletedModalsAnimation
                            ? 1
                            : 0,
                }}
                transition={{ duration: 0.3 }}
                className="max-sm:w-10/12 max-xs:w-10/12 bg-white p-6 flex flex-col rounded-lg items-center text-sm"
            >
                <div className="p-4 mb-7 rounded-full bg-black flex items-center justify-center border-8 outline outline-8 outline-gray-100 border-gray-200">
                    <img src={bag} alt="" className="h-4" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center">
                    Đơn hàng của bạn đã hoàn thành
                </h3>
                <span className="text-center mb-1">
                    Cảm ơn bạn đã tin tưởng mua sắm tại HOMECOR!
                </span>
                <span className="mb-4 text-center">
                    Chúng tôi sẽ xử lý đơn hàng và giao đến bạn sớm nhất có thể.
                </span>
                <div className="bg-yellow-base text-white w-full text-center py-2 rounded-md mb-3 hover:brightness-110 cursor-pointer">
                    <Link to="/user/My-orders/All-Orders">Xem đơn hàng</Link>
                </div>
                <div
                    onClick={handleClickToHome}
                    className="border border-yellow-base text-yellow-base w-full text-center py-2 rounded-md hover:brightness-110 cursor-pointer"
                >
                    Trở lại trang chủ
                </div>
            </motion.div>
        </motion.div>
    );
}

export default OrderCompletedModal;
