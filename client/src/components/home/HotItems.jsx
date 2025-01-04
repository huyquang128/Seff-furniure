import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import heart from '@/assets/svg/heart.svg';
import { useDispatch, useSelector } from 'react-redux';
import star from '@/assets/svg/star.svg';
import star_yellow from '@/assets/svg/star_yellow.svg';
import { setCategoryProductHot } from '@/redux/menuNav';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import LayoutProduct from '@/components/common/LayoutProductList';

function HotItems() {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const dispatch = useDispatch();

    //state redux
    const category = useSelector((state) => state?.menuNav.menuNav);
    const categorySlice = category?.slice(0, 4);

    const categoryProductHotActive = useSelector(
        (state) => state?.menuNav.categoryProductHotActive
    );

    const categoryLink = useSelector((state) => state?.menuNav.categoryLink);

    //state react
    const [screenSize, setScreenSize] = useState({
        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
    });

    //hooks
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isXs: width <= 375,
                isSm: width > 375 && width <= 480,
                isMd: width > 480 && width <= 768,
                isLg: width > 768 && width <= 1025,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it once on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    //handle Events

    return (
        <div
            ref={ref}
            className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 mt-20 mb-16"
        >
            <motion.h3
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl text-center mb-4 max-lg:text-2xl"
            >
                SẢN PHẨM NỔI BẬT
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, y: 70 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="text-neutral-600 text-center mb-10"
            >
                Nhanh tay sở hữu sản phẩm chất lượng với giá hời! Mua ngay để
                không gian sống của bạn thêm trọn vẹn.
            </motion.p>

            {/* category */}
            {screenSize?.isSm ? (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={2.5}
                        navigation={{}}
                        modules={[Navigation]}
                    >
                        {categorySlice?.map((category, index) => (
                            <SwiperSlide key={category._id}>
                                <button
                                    key={category._id}
                                    onClick={() =>
                                        dispatch(
                                            setCategoryProductHot({
                                                index,
                                                link: category.link,
                                            })
                                        )
                                    }
                                    className={`${
                                        categoryProductHotActive === index
                                            ? 'text-black bg-gray-100'
                                            : 'text-gray-500 '
                                    } px-7 py-3.5 text-sm font-medium min-w-40 
                                rounded-full hover:text-black transition-color ease-in-out duration-300`}
                                >
                                    <Link to="">{category.title}</Link>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="flex items-center justify-between mb-10 max-lg:flex-wrap max-lg:gap-2 max-lg:justify-center"
                >
                    <div className="flex flex-wrap">
                        {categorySlice?.map((category, index) => (
                            <button
                                key={category._id}
                                onClick={() =>
                                    dispatch(
                                        setCategoryProductHot({
                                            index,
                                            link: category.link,
                                        })
                                    )
                                }
                                className={`${
                                    categoryProductHotActive === index
                                        ? 'text-black bg-gray-100'
                                        : 'text-gray-500 '
                                } px-7 py-3.5 text-sm font-medium min-w-40 
                                rounded-full hover:text-black transition-color ease-in-out duration-300`}
                            >
                                <Link>{category.title}</Link>
                            </button>
                        ))}
                    </div>
                    <button
                        className="text-sm flex items-center gap-2 border border-black text-black-second
                                        px-6 py-2 rounded-full font-medium hover:text-white hover:bg-black
                                        transition-all ease-in-out duration-300"
                    >
                        <span>
                            <Link to={`/room/${categoryLink}`}>Xem thêm</Link>
                        </span>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-3 hover:bg-white"
                        />
                    </button>
                </motion.div>
            )}

            {/* products */}
            <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="grid grid-cols-4 max-lg:gap-4 max-lg:grid-cols-3 
                           max-md:grid-cols-2 max-sm:grid-cols-2 gap-8 justify-between py-4  "
            >
                {categorySlice &&
                    categorySlice[categoryProductHotActive]?.products
                        ?.slice(0, 16)
                        .map((item, index) => (
                            <div key={index}>
                                <LayoutProduct item={item} />
                            </div>
                        ))}
            </motion.div>
        </div>
    );
}

export default HotItems;
