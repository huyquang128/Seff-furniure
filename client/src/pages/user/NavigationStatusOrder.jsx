import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const categoryStatusOrders = [
    { title: 'Tất cả đơn hàng', link: 'All-Orders' },
    { title: 'Đang chờ', link: 'Processing-Order' },
    { title: 'Đang vận chuyển', link: 'Shipping-Order' },
    { title: 'Đã giao hàng', link: 'Delivered-Order' },
    { title: 'Đã hủy', link: 'Canceled-Order' },
];

function NavigationStatusOrder() {
    const location = useLocation();
    const locationCurrent = location.pathname.split('/').at(3);

    return (
        <div className="mb-4 bg-gray-100 rounded-md ">
            <Swiper
                breakpoints={{
                    375: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
                className="overflow-hidden"
            >
                {categoryStatusOrders.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`${
                                locationCurrent === item.link
                                    ? 'bg-orange-100 text-yellow-600'
                                    : ''
                            }   w-full p-3 text-sm text-center rounded-md`}
                            key={index}
                        >
                            <Link to={item.link}>
                                <span className="px-3 py-3 cursor-pointer">
                                    {item.title}
                                </span>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default NavigationStatusOrder;
