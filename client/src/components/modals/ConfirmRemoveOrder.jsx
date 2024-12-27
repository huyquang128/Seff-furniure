import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import close from '@/assets/svg/close.svg';
import { getAllOrder, removeOrder } from '@/redux/orderSlice';
import ToastMessage from '../common/ToastMessage';

function ConfirmRemoveOrder({
    isShowModalConfirmRemoveOrder,
    setIsShowModalConfirmRemoveOrder,
    orderId,
    imgUrl,
    orderTotal,
}) {
    const dispatch = useDispatch();

    //
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    //
    const handleRemoveOrder = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsShowModalConfirmRemoveOrder(false);
            dispatch(removeOrder(orderId)).then((data) => {
                if (data.payload.success) {
                    dispatch(getAllOrder());

                    ToastMessage({
                        message: `Đã xóa đơn hàng ${orderId}`,
                        position: 'top-center',
                        status: 'success',
                    });
                }
            });
        }, 300);
    };

    const closeModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsShowModalConfirmRemoveOrder(false);
        }, 300);
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isShowModalConfirmRemoveOrder && !isCloseModalAnimation
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
                        isShowModalConfirmRemoveOrder && !isCloseModalAnimation
                            ? 1
                            : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-96 max-md:w-8/12 max-sm:w-10/12 bg-white p-1 flex flex-col rounded-lg items-center text-sm"
            >
                {' '}
                <div className="flex justify-end w-full mb-2 cursor-pointer">
                    <img onClick={closeModal} src={close} alt="" />
                </div>
                <div className="px-4 flex flex-col items-center">
                    <span className="text-lg font-medium"> Bạn muốn hủy</span>
                    <span className="">
                        {' '}
                        đơn hàng{' '}
                        <span className="text-yellow-base">{orderId}</span> ?
                    </span>
                </div>
                <div className="flex flex-col gap-5 items-center border-b py-4 w-full">
                    <img src={imgUrl} alt="" className="h-24" />
                    <div className="flex flex-col">
                        Tổng tiền: {orderTotal.toLocaleString('VN-vn')}
                    </div>
                </div>
                <div className="py-2 flex gap-2 w-full justify-end">
                    <button className="text-black-base border py-2 px-3 rounded-md">
                        Thoát
                    </button>
                    <button
                        onClick={handleRemoveOrder}
                        className="border-none py-2 px-3 rounded-md text-white bg-yellow-base hover:brightness-105
                                        outline-none "
                    >
                        Xác nhận
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ConfirmRemoveOrder;
