import { motion } from 'framer-motion';
import FormCommon from '../common/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
    addAddressUser,
    getProfileUser,
    setFormAddAddressNew,
    updateAddressUser,
    updateProfile,
} from '@/redux/authSlice';
import { formAddressNew } from '../config/formConfig';
import close from '@/assets/svg/close.svg';
import ToastMessage from '../common/ToastMessage';

function AddNewAddressModals({
    isShowAddNewAddress,
    setIsShowAddNewAddress,
    isTitleAddressModal,
    buttonText,
    addressId,
    addressTypeAddOrUpdate,
}) {
    let namePropertyInput, setNamePropertyInput, isValidForm, setIsValidForm;

    const dispatch = useDispatch();
    //state redux
    const formAddAddressNewValue = useSelector(
        (state) => state?.auth.formAddAddressNew
    );
    const valueProvince = useSelector(
        (state) => state.auth?.temporary.valueProvince
    );
    const valueDistrict = useSelector(
        (state) => state.auth?.temporary.valueDistrict
    );
    const valueWard = useSelector((state) => state.auth?.temporary.valueWard);
    const authSelector = useSelector((state) => state?.auth);

    ///state react
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    //events
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            userId: authSelector.user?.id,
            firstName: formAddAddressNewValue.firstName,
            lastName: formAddAddressNewValue.lastName,
            phone: formAddAddressNewValue.phone,
            detailAddress: formAddAddressNewValue.detailAddress,
            province: valueProvince.value,
            district: valueDistrict.value,
            ward: valueWard.value,
        };
        if (addressTypeAddOrUpdate === 'add new address') {
            dispatch(addAddressUser(formData)).then((data) => {
                if (data.payload.success) {
                    ToastMessage({
                        message: 'Đã thêm địa chỉ mới',
                        position: 'top-center',
                        status: 'success',
                    });

                    dispatch(getProfileUser(authSelector.user?.id));
                    handleCloseModal();
                }
            });
        } else {
            const formDataUpdate = { ...formData, addressId };
            console.log(formDataUpdate);
            dispatch(updateAddressUser(formDataUpdate)).then((data) => {
                if (data.payload.success) {
                    ToastMessage({
                        message: 'Đã thay đổi địa chỉ',
                        position: 'top-center',
                        status: 'success',
                    });

                    dispatch(getProfileUser(authSelector.user?.id));
                    handleCloseModal();
                }
            });
        }
    };

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
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-end  bg-models z-20"
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{
                    x:
                        isShowAddNewAddress && !isCloseModalAnimation
                            ? '0%'
                            : '100%',
                }}
                transition={{ duration: 0.3 }}
                className="bg-white w-5/12 h-full overflow-y-scroll max-lg:w-9/12 max-sm:w-11/12 px-5 py-4 rounded-md "
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold ">{isTitleAddressModal}</h1>
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
                        buttonText={buttonText}
                        onSubmit={handleSubmit}
                        type={'formAddAddressNew'}
                        namePropertyInput={namePropertyInput}
                        setNamePropertyInput={setNamePropertyInput}
                        isValidForm={isValidForm}
                        setIsValidForm={setIsValidForm}
                        addressId={addressId}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AddNewAddressModals;
