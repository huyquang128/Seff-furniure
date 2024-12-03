import FormCommon from '@/components/common/Form';
import { formLoginController } from '@/components/config/formConfig';
import gg from '@/assets/svg/gg.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setFormLogin } from '@/redux/authSlice';
import ToastMessage from '@/components/common/ToastMessage';

function Login() {
    const formValueLogin = useSelector((state) => state?.auth.formValueLogin);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(formValueLogin)).then((data) => {
            if (data?.payload?.success) {
                ToastMessage({
                    message: 'Đăng nhập thành công!',
                    position: 'top-right',
                    status: 'success',
                });
            }
        });
    };

    return (
        <div className="flex">
            <div className="max-md:w-full max-md:fixed max-md:brightness-50 z-10 px-4 bg-auth w-6/12  min-h-screen bg-cover"></div>
            <div className="flex  flex-col max-md:justify-center max-md:h-screen max-md:z-20 mx-auto">
                <h1 className="text-yellow-base brightness-110 font-sans max-md:hidden font-semibold text-center text-3xl mt-10 mb-10">
                    HOMECOR.
                </h1>
                <h2 className="text-4xl font-bold max-md:brightness-125  text-yellow-base text-center mb-2">
                    Đăng Nhập
                </h2>
                <p className="text-md max-md:text-white-second max-sm:text-sm text-yellow-base mb-7 ">
                    Trải nghiệm mua sắm nội thất đẳng cấp với Homecor
                </p>
                <div className="flex max-md:brightness-125 justify-center gap-3 max-md:text-white-second text-yellow-base border border-yellow-base rounded-full p-2 mb-5">
                    <img src={gg} alt="" className="" />
                    <p className="">Đăng nhập với Google</p>
                </div>
                <div className="flex gap-2 justify-center items-center mb-5 max-md:brightness-125">
                    <div className="bg-yellow-base w-3/12 h-[0.5px]"></div>
                    <span className="text-yellow-base">or</span>
                    <div className="bg-yellow-base w-3/12 h-[0.5px]"></div>
                </div>
                <FormCommon
                    form={formValueLogin}
                    setForm={setFormLogin}
                    formController={formLoginController}
                    buttonText={'Đăng nhập'}
                    onSubmit={handleSubmit}
                    type={'auth'}
                />
                <div className="text-black-base max-md:text-white text-sm text-center  ">
                    Bạn chưa có tài khoản?
                    <span className="text-yellow-base max-md:brightness-125">
                        <Link to="/auth/register">Đăng ký</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
