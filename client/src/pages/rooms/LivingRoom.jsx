import ZoomProduct from '@/components/Room/RoomProduct';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import link_arr_right from '@/assets/svg/link-arr-right.svg';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';

function LivingRoom() {
    const location = useLocation();
    const path = location.pathname.split('/');
    const listProductLiving = useSelector(
        (state) => state?.products?.livingRoomAllProd
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <div className="mt-[160px] max-md:mt-0 w-full mb-10 ">
            <div
                className="bg-living-1 h-[500px] max-md:h-[400px] mb-10 max-md:py-10 max-md:justify-end 
                            bg-cover bg-center"
            >
                <div
                    className="max-w-[1440px] h-[500px] max-md:h-[400px] mx-auto 
                                max-xl:px-[68px] max-lg:px-3
                                flex flex-col justify-center items-start 
                                max-md:py-16 max-md:justify-end 
                                max-lg:mx-0"
                >
                    <div className="flex max-md:text-sm px-3 text-white mb-4">
                        <span>
                            <Link to="/">Trang Chủ</Link>
                        </span>
                        <img src={link_arr_right} alt="" />
                        <Link>{path[2]}</Link>
                    </div>
                    <h1
                        className="text-white max-md:text-3xl
                                text-5xl font-bold"
                    >
                        PHÒNG KHÁCH
                    </h1>
                </div>
            </div>
            <div
                className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 relative max-lg:mx-0 "
            >
                <div className="mb-5">
                    Come Home hiểu rằng nội thất phòng khách không chỉ thể hiện
                    phong cách cá nhân mà còn tạo ra một không gian ấm cúng và
                    hấp dẫn cho bạn, gia đình và bạn bè. Với bộ sưu tập đa dạng
                    đồ nội thất phòng khách của chúng tôi, chúng tôi hy vọng
                    mang đến rất nhiều lựa chọn phù hợp với phong cách và không
                    gian của bạn, từ những bộ ghế sofa thoải mái và sang trọng
                    cho đến các bộ bàn và ghế phụ hay các phụ kiện đa năng như
                    kệ treo tường. Vì thế, hãy tạo ra những không gian sống và
                    sinh hoạt độc đáo và tinh tế dành riêng cho bạn.
                </div>
                <button className="text-sm mb-10 font-medium text-red-700">
                    Xem chi tiết
                    <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                </button>
                <ZoomProduct roomProducts={listProductLiving} />
            </div>
        </div>
    );
}

export default LivingRoom;
