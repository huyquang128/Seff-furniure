import { motion } from 'framer-motion';
import close from '@/assets/svg/close.svg';
import { useState } from 'react';
import { deleteCartItem } from '@/redux/cartSlice';
import { useDispatch } from 'react-redux';
import ToastMessage from '../common/ToastMessage';

function ConfirmRemoveCartProductModal({
    isOpenConfirmProductCartModal,
    setIsOpenConfirmProductCartModal,
    productName,
    productImg,
    userId,
    productId,
}) {
    const dispatch = useDispatch();
    const [isCloseModalAnimation, setCloseModalAnimation] = useState(false);

    const handleAgreeRemoveProduct = () => {
        setCloseModalAnimation(true);

        setTimeout(() => {
            setCloseModalAnimation(false);
            setIsOpenConfirmProductCartModal(false);
            dispatch(
                deleteCartItem({
                    userId,
                    productIds: [productId],
                })
            ).then((data) => {
                if (data?.payload.success) {
                    ToastMessage({
                        status: 'success',
                        message: 'Sản phẩm đã được xóa!',
                        position: 'top-center',
                    });
                }
            });
        }, [300]);
    };

    const handleExit = () => {
        setCloseModalAnimation(true);

        setTimeout(() => {
            setCloseModalAnimation(false);
            setIsOpenConfirmProductCartModal(false);
        }, [300]);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isOpenConfirmProductCartModal && !isCloseModalAnimation
                        ? 1
                        : 0,
            }}
            transition={{ duration: 0.3 }}
            className=" fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-50"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity:
                        isOpenConfirmProductCartModal && !isCloseModalAnimation
                            ? 1
                            : 0,
                }}
                transition={{ duration: 0.3 }}
                className="max-sm:w-8/12 max-xs:w-10/12 bg-white p-1 flex flex-col rounded-lg items-center text-sm"
            >
                <div className="w-full flex justify-end mb-3  ">
                    <img
                        onClick={handleExit}
                        src={close}
                        alt=""
                        className="bg-gray-100 h-6 rounded-full p-0.5 cursor-pointer hover:border"
                    />
                </div>
                <div className="px-5">
                    <h3 className="mb-3 text-center">
                        Bạn muốn xóa sản phẩm{' '}
                        <span className="text-yellow-base">{productName}</span>{' '}
                        trong giỏ hàng?
                    </h3>
                    <div className="flex justify-center mb-5">
                        <img
                            src={productImg}
                            alt=""
                            className="h-24 w-24 rounded-lg object-cover"
                        />
                    </div>
                    <div className="w-full flex justify-end gap-2 mb-3">
                        <button
                            className="border border-black-base w-24 hover:bg-black-base hover:text-white 
                                    py-1.5 rounded-md transition-colors ease-in-out duration-300"
                            onClick={handleExit}
                        >
                            Thoát
                        </button>
                        <button
                            className="border border-black-base w-24 hover:bg-black-base hover:text-white 
                                    py-1.5 rounded-md transition-colors ease-in-out duration-300"
                            onClick={handleAgreeRemoveProduct}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ConfirmRemoveCartProductModal;
