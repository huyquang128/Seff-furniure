import { Link, Outlet } from 'react-router-dom';
import arrRight from '@/assets/svg/arr-right.svg';
import InfoProductPayment from './InfoProductPayment';
function CheckOutLayout() {
    return (
        <div className="w-[1440px] mx-auto max-lg:w-full max-md:w-11/12  max-sm:w-full">
            <div
                className="w-[1244px] mx-auto flex px-[72px] max-lg:w-full max-lg:px-[51px]
            max-lg:mx-0 max-md:flex-col-reverse max-md:items-center  max-sm:px-4 "
            >
                {/* block left */}
                <div className="w-7/12 pt-[56px] pr-[66px] max-lg:pr-[30px] max-md:pr-0 max-md:w-full max-md:border-t max-md:pt-5 ">
                    <h1 className="font-medium text-yellow-base mb-3 text-[28px] max-md:hidden">
                        HOMECOR.
                    </h1>
                    <div className="flex text-xs items-center mb-3 max-md:hidden">
                        <Link to="/your-cart">Giỏ hàng</Link>
                        <img src={arrRight} alt="" />
                        <Link to="/cart/checkout-step-1">
                            Thông tin giao hàng
                        </Link>
                        <img src={arrRight} alt="" />
                        <Link to="/cart/checkout-step-2">
                            Phương thức thanh toán
                        </Link>
                    </div>
                    <Outlet />

                    {/* footer */}
                    <div className="text-xs py-3 border-t text-center text-black-text mb-20">
                        Powered by Haravan
                    </div>
                </div>

                {/* block right */}
                <InfoProductPayment />
            </div>
        </div>
    );
}

export default CheckOutLayout;
