import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChildMenu } from '@/redux/menuNav';

function ProductDiscovery() {
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const dispatch = useDispatch();

    //state redux
    const childMenu = useSelector((state) => state?.menuNav?.childMenu);

    //hook
    useEffect(() => {
        dispatch(getChildMenu());
    }, [dispatch]);

    return (
        <div
            ref={ref}
            className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                    max-lg:px-3 mt-10 relative max-lg:mx-0 max-md:mt-20"
        >
            <motion.h2
                initial={{ opacity: 0, x: -100 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl mb-10 max-md:text-center max-md:text-2xl"
            >
                KHÁM PHÁ SẢN PHẨM
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <Swiper
                    className="w-full bg-bg-slider max-sm:py-0 max-sm:text-xs  p-3 rounded-xl"
                    breakpoints={{
                        375: {
                            slidesPerView: 4,
                        },
                        425: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                        1400: {
                            slidesPerView: 7,
                        },
                    }}
                    spaceBetween={20}
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next-1',
                        prevEl: '.swiper-button-prev-1',
                    }}
                    modules={[Navigation]}
                >
                    {childMenu?.map((menu, index) => (
                        <SwiperSlide
                            key={menu._id}
                            className=" py-4 rounded-2xl hover:bg-white cursor-pointer transition-colors ease-linear duration-400"
                        >
                            <Link
                                to={`/room/${
                                    (index >= 0 &&
                                        index <= 2 &&
                                        'living-room') ||
                                    (index >= 3 && index <= 6 && 'bed-room') ||
                                    (index >= 7 && index <= 10 && 'kitchen') ||
                                    (index >= 11 && 'work-room')
                                }/${menu.link}`}
                                className="flex flex-col gap-2 items-center "
                            >
                                <img
                                    src={menu.products[0].colors[0].images[0]}
                                    alt=""
                                    className="h-20 min-w-28 max-lg:min-w-22 max-sm:min-w-20 rounded-md"
                                />
                                <span className="font-medium text-sm text-center">
                                    {menu.title}
                                </span>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={inView ? { opacity: 1, x: 0, y: -40 } : { opacity: 0 }}
                transition={{ duration: 1 }}
                className="swiper-button-prev-1 max-lg:top-[70%] max-lg:-left-1 max-sm:hidden"
            >
                <FontAwesomeIcon
                    icon={faCaretLeft}
                    className="text-gray-500 bg-white px-3.5 py-2.5 rounded-full shadow-btn-slider"
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0, y: -40 } : { opacity: 0 }}
                transition={{ duration: 1 }}
                className="swiper-button-next-1 max-lg:top-[70%] max-lg:-right-1 max-sm:hidden"
            >
                <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-gray-500 bg-white px-3.5 py-2.5 rounded-full shadow-btn-slider"
                />
            </motion.div>
        </div>
    );
}

export default ProductDiscovery;
