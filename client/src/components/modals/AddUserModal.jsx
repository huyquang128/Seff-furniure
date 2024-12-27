import { motion } from 'framer-motion';
import { useState } from 'react';
import close from '@/assets/svg/close.svg';
import close_white from '@/assets/svg/close_white.svg';
import FormCommon from '../common/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getAllUsers, setAddUser } from '@/redux/authSlice';
import { formAddUser } from '../config/formConfig';
import ToastMessage from '../common/ToastMessage';

function AddUserModal({ isShowModalAddUser, setIsShowModalAddUser }) {
    const dispatch = useDispatch();
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    //
    const authRedux = useSelector((state) => state?.auth);
    
    //
    const closeModal = () => {
        setIsCloseModalAnimation(true);

        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsShowModalAddUser(false);
        }, 300);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', authRedux?.formAddUser.username);
        formData.append('email', authRedux?.formAddUser.email);
        formData.append('password', authRedux?.formAddUser.password);
        formData.append('phone', authRedux?.formAddUser.phone);

        dispatch(addUser(formData)).then((data) => {
            if (data.payload.success) {
                setIsCloseModalAnimation(true);
                dispatch(getAllUsers());

                setTimeout(() => {
                    setIsCloseModalAnimation(false);
                    setIsShowModalAddUser(false);
                    ToastMessage({
                        message: 'Thêm khách hàng thành công',
                        position: 'top-center',
                        status: 'success',
                    });
                }, 300);
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: isShowModalAddUser && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-end  bg-models z-20"
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{
                    x:
                        isShowModalAddUser && !isCloseModalAnimation
                            ? '0%'
                            : '100%',
                }}
                transition={{ duration: 0.3 }}
                className="bg-background w-5/12 h-full overflow-y-scroll max-lg:w-9/12 max-sm:w-11/12 px-5 py-4 rounded-md "
            >
                <div className="flex justify-between mb-5 ">
                    <div className="text-xl text-text-first">
                        Thêm khách hàng
                    </div>
                    <img
                        onClick={closeModal}
                        src={authRedux.theme === 'light' ? close : close_white}
                        alt=""
                        className="cursor-pointer"
                    />
                </div>
                {/* <div>
                    <input type="file" />
                </div> */}
                <div>
                    <FormCommon
                        form={authRedux?.formAddUser}
                        setForm={setAddUser}
                        formController={formAddUser}
                        buttonText={'Thêm'}
                        onSubmit={onSubmit}
                        type={'add user'}
                        // namePropertyInput={namePropertyInput}
                        // setNamePropertyInput={setNamePropertyInput}
                        // isValidForm={isValidForm}
                        // setIsValidForm={setIsValidForm}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AddUserModal;
