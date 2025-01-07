import { motion } from 'framer-motion';
import { useState } from 'react';
import close from '@/assets/svg/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser, removeAddressUser } from '@/redux/authSlice';
import ToastMessage from '../common/ToastMessage';

function RemoveAddress({
    isOpenModalRemoveAddress,
    setIsOpenModalRemoveAddress,
    addressId,
}) {
    const dispatch = useDispatch();
    const [isCloseModalAnimation, setIsCLoseModalAnimation] = useState(false);

    //
    const user = useSelector((state) => state?.auth.user);

    //handle events
    const handleCloseModal = () => {
        setIsCLoseModalAnimation(true);
        setTimeout(() => {
            setIsCLoseModalAnimation(false);
            setIsOpenModalRemoveAddress(false);
        }, 300);
    };

    const handleRemoveAddress = () => {
        const formData = {
            userId: user.id,
            addressId,
        };
        setIsCLoseModalAnimation(true);
        setTimeout(() => {
            setIsCLoseModalAnimation(false);
            setIsOpenModalRemoveAddress(false);
        }, 300);
        dispatch(removeAddressUser(formData)).then((data) => {
            if (data.payload?.success) {
                ToastMessage({
                    message: 'Đã xóa địa chỉ',
                    position: 'top-center',
                    status: 'success',
                });
                dispatch(getProfileUser(user.id));
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isOpenModalRemoveAddress && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-30 "
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity:
                        isOpenModalRemoveAddress && !isCloseModalAnimation
                            ? 1
                            : 0,
                }}
                transition={{ duration: 0.4 }}
                className="bg-white w-80 max-md:w-72 max-md:h-auto rounded-2xl"
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
                    <div className="font-medium text-lg">Xóa địa chỉ?</div>
                    <div className="text-gray-600 text-sm  pb-5 pt-2">
                        Không thể khôi phục những địa chỉ đã xóa.
                    </div>
                </div>
                <div className="flex w-full text-sm justify-between">
                    <div className="w-1/2 text-gray-500 border-r hover:brightness-105 cursor-pointer text-center py-2">
                        Giữ lại
                    </div>
                    <div
                        onClick={handleRemoveAddress}
                        className="w-1/2 text-center py-2 cursor-pointer  hover:brightness-125"
                    >
                        Xóa
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default RemoveAddress;
