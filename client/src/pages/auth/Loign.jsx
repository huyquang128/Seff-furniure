import { formLoginController } from '@/components/config/formConfig';
import { useDispatch, useSelector } from 'react-redux';
import { login, setFormLogin } from '@/redux/authSlice';
import ToastMessage from '@/components/common/ToastMessage';
import AuthSectionTop from '@/components/auth/AuthSectionTop';
import { useState } from 'react';

function Login() {
    const formValueLogin = useSelector((state) => state?.auth.formValueLogin);

    const dispatch = useDispatch();
    const [namePropertyInput, setNamePropertyInput] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValueLogin.email === '' && formValueLogin.password === '') {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
            dispatch(login(formValueLogin)).then((data) => {
                if (data?.payload?.success) {
                    ToastMessage({
                        message: 'Đăng nhập thành công!!',
                        position: 'top-center',
                        status: 'success',
                    });
                }
            });
        }
    };

    return (
        <AuthSectionTop
            title="Đăng Nhập"
            questionRedirect="Đăng ký"
            linkAuth="/auth/register"
            form={formValueLogin}
            setForm={setFormLogin}
            formController={formLoginController}
            buttonText={'Đăng nhập'}
            onSubmit={handleSubmit}
            type={'auth'}
            namePropertyInput={namePropertyInput}
            setNamePropertyInput={setNamePropertyInput}
            isValidForm={isValidForm}
            setIsValidForm={setIsValidForm}
        />
    );
}

export default Login;
