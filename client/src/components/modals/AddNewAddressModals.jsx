import { motion } from 'framer-motion';
import FormCommon from '../common/Form';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { setFormAddAddressNew } from '@/redux/authSlice';
import { formAddressNew } from '../config/formConfig';
import close from '@/assets/svg/close.svg';

function AddNewAddressModals({ isShowAddNewAddress, setIsShowAddNewAddress }) {
    //state redux
    const formAddAddressNewValue = useSelector(
        (state) => state?.order.formAddAddressNew
    );

    ///state react
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const handleSubmit = () => {};

    const handleCloseModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsShowAddNewAddress(false);
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: isShowAddNewAddress && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-20"
        >
            <motion.div className="bg-white w-6/12 max-md:w-8/12 max-sm:w-11/12 px-5 py-4 rounded-md ">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold ">Thêm địa chỉ mới</h1>
                    <img
                        src={close}
                        alt=""
                        onClick={handleCloseModal}
                        className="cursor-pointer"
                    />
                </div>
                <div>
                    <FormCommon
                        form={formAddAddressNewValue}
                        setForm={setFormAddAddressNew}
                        formController={formAddressNew}
                        buttonText={'Thêm địa chỉ mới'}
                        onSubmit={handleSubmit}
                        type={'formAddAddressNew'}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AddNewAddressModals;
