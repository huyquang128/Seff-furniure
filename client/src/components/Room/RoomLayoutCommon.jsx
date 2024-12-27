/* eslint-disable react/prop-types */
import RoomProduct from './RoomProduct';
import link_arr_right from '@/assets/svg/link-arr-right.svg';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

function RoomLayoutCommon({
    background,
    menuAndProduct,
    type,
    name,
    description,
}) {
    const location = useLocation();
    const path = location.pathname.split('/');

    return (
        <div className="mt-[160px] max-md:mt-0 w-full mb-10 relative">
            <div className="w-full max-w-[1440px] max-xl:max-w-[1440px] flex justify-center mx-auto">
                <div
                    className="max-w-[1440px] max-xl:px-[68px] w-full h-[500px] max-md:h-[400px] max-lg:px-3
                                flex flex-col justify-center items-start
                                max-md:py-16 max-md:justify-end
                                max-lg:mx-0 text-white absolute z-10"
                >
                    <div className="flex max-md:text-sm gap-1  mb-4 items-center ">
                        <span>
                            <Link to="/">Trang Chủ</Link>
                        </span>
                        <img src={link_arr_right} alt="" className="h-4" />
                        <Link>{path[2]}</Link>
                    </div>
                    <h1
                        className=" max-md:text-3xl
                                    text-5xl font-bold "
                    >
                        {name}
                    </h1>
                </div>
            </div>
            <img
                src={background}
                alt=""
                className="h-[500px] max-md:h-[400px] w-full brightness-75 mb-10 object-cover"
            />
            <div
                className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                        max-lg:px-3 relative max-lg:mx-0 "
            >
                <div className="mb-5">{description}</div>
                <button className="text-sm mb-10 font-medium text-red-700 hover:brightness-125">
                    Xem chi tiết
                    <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                </button>
                <RoomProduct menuAndProduct={menuAndProduct} type={type} />
            </div>
        </div>
    );
}

export default RoomLayoutCommon;
