import { formRegisterController } from '@/components/config/formConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, setFormRegister } from '@/redux/authSlice';
import ToastMessage from '@/components/common/ToastMessage';
import AuthSectionTop from '@/components/auth/AuthSectionTop';
import { useState } from 'react';

function Register() {
    const formValueRegister = useSelector(
        (state) => state?.auth.formValueRegister
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [namePropertyInput, setNamePropertyInput] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formValueRegister.username === '' &&
            formValueRegister.email === '' &&
            formValueRegister.password === ''
        ) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
            dispatch(register(formValueRegister)).then((data) => {
                if (data?.payload?.success) {
                    ToastMessage({
                        message: 'Đăng ký tài khoản thành công!!',
                        position: 'top-center',
                        status: 'success',
                    });
                    navigate('/auth/login');
                }
            });
        }
    };

    return (
        <>
            <AuthSectionTop
                title="Đăng ký"
                questionRedirect="Đăng nhập"
                linkAuth="/auth/login"
                form={formValueRegister}
                setForm={setFormRegister}
                formController={formRegisterController}
                buttonText={'Đăng ký'}
                onSubmit={handleSubmit}
                type={'auth'}
                namePropertyInput={namePropertyInput}
                setNamePropertyInput={setNamePropertyInput}
                isValidForm={isValidForm}
                setIsValidForm={setIsValidForm}
            />
        </>
    );
}

export default Register;
