/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState } from 'react';
import close from '@/assets/svg/close.svg';
import { useDispatch } from 'react-redux';
import { getAllUsers, removeUser } from '@/redux/authSlice';
import ToastMessage from '../common/ToastMessage';
import { getOrders, removeOrder } from '@/redux/orderSlice';

function ConfirmRemoveUser({
    isShowModalConfirmRemove,
    setIsShowModalConfirmRemove,
    arrCheckboxAllRemove,
    type,
    id,
    typePage,
}) {
    const dispatch = useDispatch();

    //
    const [isCloseModalAnimation, setIsCLoseModalAnimation] = useState(false);

    //handle events
    const handleCloseModal = () => {
        setIsCLoseModalAnimation(true);
        setTimeout(() => {
            setIsCLoseModalAnimation(false);
            setIsShowModalConfirmRemove(false);
        }, 300);
    };

    const handleRemoveUserChecked = () => {
        let formData;

        setIsCLoseModalAnimation(true);
        setTimeout(() => {
            setIsCLoseModalAnimation(false);
            setIsShowModalConfirmRemove(false);
        }, 300);

        type === 'remove-single'
            ? (formData = { userId: id })
            : typePage === 'customer'
            ? (formData = {
                  userId: arrCheckboxAllRemove,
              })
            : (formData = {
                  orderId: arrCheckboxAllRemove,
              });

        dispatch(
            typePage === 'customer'
                ? removeUser(formData)
                : removeOrder(formData)
        ).then((data) => {
            if (data.payload.success) {
                ToastMessage({
                    message: `${data.payload.message}`,
                    position: 'top-center',
                    status: 'success',
                });

                dispatch(typePage === 'customer' ? getAllUsers() : getOrders());
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isShowModalConfirmRemove && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-30 "
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity:
                        isShowModalConfirmRemove && !isCloseModalAnimation
                            ? 1
                            : 0,
                }}
                transition={{ duration: 0.4 }}
                className="bg-white w-80 max-md:w-72 max-md:h-auto rounded-2xl -translate-y-20"
            >
                {/* qr code */}

                <div className="flex justify-end w-full ">
                    <img
                        onClick={handleCloseModal}
                        src={close}
                        alt=""
                        className="h-9 p-2 cursor-pointer"
                    />
                </div>
                <div className="flex flex-col items-center w-full border-b">
                    <div className="font-medium text-lg">Xóa tài khoản?</div>
                    <div className="text-gray-600 text-sm  text-center pb-5 pt-2">
                        Không thể khôi phục những tài khoản khách hàng đã xóa.
                    </div>
                </div>
                <div className="flex w-full text-sm justify-between">
                    <div
                        onClick={handleCloseModal}
                        className="w-1/2 text-gray-500 border-r hover:brightness-105 cursor-pointer text-center py-2"
                    >
                        Giữ lại
                    </div>
                    <div
                        onClick={handleRemoveUserChecked}
                        className="w-1/2 text-center py-2 cursor-pointer  hover:brightness-125"
                    >
                        Xóa
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ConfirmRemoveUser;
