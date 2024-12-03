import FormCommon from '@/components/common/Form';
import { formRegisterController } from '@/components/config/formConfig';
import gg from '@/assets/svg/gg.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, setFormRegister } from '@/redux/authSlice';
import ToastMessage from '@/components/common/ToastMessage';

function Register() {
    const formValueRegister = useSelector(
        (state) => state?.auth.formValueRegister
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formValueRegister)).then((data) => {
            if (data?.payload?.success) {
                ToastMessage({
                    message: data.payload?.message,
                    position: 'top-right',
                    status: 'success',
                });
                navigate('/auth/login');
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
                    Đăng Ký
                </h2>
                <p className="text-md max-md:text-white-second max-sm:text-sm text-yellow-base mb-7 ">
                    Trải nghiệm mua sắm nội thất đẳng cấp với Homecor
                </p>
                <div className="flex max-md:brightness-125 justify-center gap-3 max-md:text-white-second text-yellow-base border border-yellow-base rounded-full p-2 mb-5">
                    <img src={gg} alt="" className="" />
                    <p className="">Đăng nhập với Google</p>
                </div>
                <div className="flex max-md:brightness-125 gap-2 justify-center items-center mb-5">
                    <div className="bg-yellow-base w-3/12 h-[0.5px]"></div>
                    <span className="text-yellow-base">or</span>
                    <div className="bg-yellow-base w-3/12 h-[0.5px]"></div>
                </div>
                <FormCommon
                    form={formValueRegister}
                    setForm={setFormRegister}
                    formController={formRegisterController}
                    buttonText={'Đăng ký'}
                    onSubmit={handleSubmit}
                    type={'auth'}
                />
                <div className="text-black text-sm text-center max-md:text-white  ">
                    Bạn đã có tài khoản?
                    <span className="text-yellow-base max-md:brightness-125">
                        <Link to="/auth/login">Đăng nhập</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
