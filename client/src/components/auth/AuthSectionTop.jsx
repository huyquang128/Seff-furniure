import { Link } from 'react-router-dom';
import FormCommon from '../common/Form';
import gg from '@/assets/svg/gg.svg';

function AuthSectionTop({
    title,
    questionRedirect,
    linkAuth,
    form,
    setForm,
    formController,
    buttonText,
    onSubmit,
    type,
    namePropertyInput,
    setNamePropertyInput,
    isValidForm,
    setIsValidForm,
}) {
    return (
        <div className="flex">
            <div className="max-md:w-full max-md:fixed max-md:brightness-50 z-10 px-4 bg-auth w-6/12  min-h-screen bg-cover bg-center"></div>
            <div className="w-6/12 max-md:w-full flex justify-center  max-md:justify-center max-md:h-screen max-md:z-20 mx-auto">
                <div className="w-8/12 max-md:w-7/12 max-sm:w-10/12 flex flex-col justify-center gap-3 max-lg:gap-0 items-center h-screen">
                    <h1
                        className="text-yellow-base brightness-105 font-sans font-semibold text-center 
                                text-3xl max-lg:text-2xl max-xl:mb-2 max-md:m-0 max-md:mb-2"
                    >
                        HOMECOR.
                    </h1>
                    <h2
                        className="text-4xl font-medium max-md:brightness-125 text-black-base text-center
                            max-lg:text-2xl max-lg:mb-2 max-md:text-white"
                    >
                        {title}
                    </h2>
                    <p className="text-[14px] text-center max-md:text-white-second max-sm:text-sm text-black-base mb-7 ">
                        Trải nghiệm mua sắm nội thất đẳng cấp với Homecor
                    </p>
                    <div className="w-10/12 max-xl:w-11/12 max-md:w-full">
                        <div
                            className=" flex max-md:brightness-125 text-sm justify-center gap-3
                                            text-black-base border border-gray-300 max-md:bg-foreground
                                            max-md:text-black-base
                                            max-md:font-bold rounded-full py-3 px-2 mb-5 cursor-pointer"
                        >
                            <img src={gg} alt="" className="" />
                            <p className="">Đăng nhập với Google</p>
                        </div>
                        <div className="flex gap-2 justify-center items-center mb-5">
                            <div className="bg-black-base max-md:bg-white w-3/12 h-[0.5px]"></div>
                            <span className="text-black-base max-md:text-white">
                                or
                            </span>
                            <div className="bg-black-base max-md:bg-white w-3/12 h-[0.5px]"></div>
                        </div>
                        <FormCommon
                            form={form}
                            setForm={setForm}
                            formController={formController}
                            buttonText={buttonText}
                            onSubmit={onSubmit}
                            type={type}
                            namePropertyInput={namePropertyInput}
                            setNamePropertyInput={setNamePropertyInput}
                            isValidForm={isValidForm}
                            setIsValidForm={setIsValidForm}
                        />
                    </div>
                    {/*
                /> */}
                    <div className="text-black text-sm text-center max-md:text-white  ">
                        Bạn đã có tài khoản?
                        <span className="text-yellow-base max-md:brightness-125">
                            <Link to={linkAuth}>{questionRedirect}</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthSectionTop;
