import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import living_3 from '@/assets/image/living-3.jpg';
import bed_3 from '@/assets/image/bed-3.jpg';
import kitchen_1 from '@/assets/image/kitchen-1.jpg';
import work_3 from '@/assets/image/work-3.jpg';

const blockRoomSelect = [
    {
        name: 'PHÒNG KHÁCH',
        src: living_3,
        link: 'living-room',
        description:
            'Với một sự kết hợp độc đáo giữa phong cách cổ điển và hiện đại, chúng tôi mang đến cho bạn một bộ sưu tập bàn ăn đa dạng, phù hợp với không gian và phong cách của ngôi nhà bạn.',
    },
    {
        name: 'PHÒNG NGỦ',
        src: bed_3,

        link: 'bed-room',
        description:
            'Với các bộ sưu tập đa dạng về giường, nệm, khăn trải giường và các sản phẩm chăn ga gối nệm khác, chúng tôi cam kết mang đến cho bạn những trải nghiệm giấc ngủ thật tuyệt vời.',
    },
    {
        name: 'BẾP & PHÒNG ĂN',
        src: kitchen_1,
        link: 'kitchen',
        description:
            'Phòng bếp không chỉ là nơi nấu ăn, mà còn là trái tim của ngôi nhà, nơi giữ lửa hạnh phúc và kết nối yêu thương.',
    },
    {
        name: 'PHÒNG LÀM VIỆC',
        src: work_3,
        link: 'work-room',
        description:
            'Phòng làm việc là không gian của sự tập trung và sáng tạo, nơi những ý tưởng được ươm mầm và ước mơ trở thành hiện thực.',
    },
];

function IntroductionHome() {
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const [activeBlock, setActiveBlock] = useState(null);
    const [isShowContentCategory, setIsShowContentCategory] = useState(null);

    const [screenSize, setScreenSize] = useState({
        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isXs: width <= 425,
                isSm: width > 425 && width <= 480,
                isMd: width > 480 && width <= 768,
                isLg: width > 768 && width <= 1025,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it once on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className=" max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 relative z-10 max-lg:mx-0"
        >
            <div className="mt-20 mb-10" ref={ref}>
                <motion.h2
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center text-3xl mb-4 max-md:text-2xl"
                >
                    BẠN ĐANG TÌM KIẾM PHONG CÁCH MỚI CHO NGÔI NHÀ CỦA MÌNH?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center text-base text-gray-500"
                >
                    Sáng tạo một không gian sống đẹp và tiện nghi với các sản
                    phẩm chất lượng của Come Home. Đến với Come Home, bạn luôn
                    có thể dễ dàng tìm thấy bất kỳ sản phẩm cần thiết phù hợp
                    với nhu cầu và ngân sách của bạn. Chúng tôi luôn đặt chất
                    lượng và sự thoải mái tiện dụng của sản phẩm lên hàng đầu.
                </motion.p>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
            >
                <Swiper
                    breakpoints={{
                        375: {
                            slidesPerView: 1.5,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        769: {
                            slidesPerView: 3,
                        },
                    }}
                    spaceBetween={20}
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation]}
                    className="h-[420px] rounded-xl overflow-hidden max-lg:h-[350px]"
                >
                    {blockRoomSelect.map((blockRoom, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <motion.div
                                    className={`h-full overflow-hidden cursor-pointer `}
                                    whileHover="hover"
                                    onMouseEnter={() => setActiveBlock(index)}
                                    onMouseLeave={() => setActiveBlock(null)}
                                >
                                    <img
                                        src={blockRoom.src}
                                        alt=""
                                        className={`object-cover h-full w-full absolute rounded-xl ${
                                            activeBlock === index
                                                ? 'blur-[1.5px]'
                                                : ''
                                        }`}
                                    />
                                    <motion.div
                                        className="flex items-end max-lg:-translate-y-64 h-full 
                                                        max-md:text-sm bg-black bg-opacity-35 rounded-xl"
                                        initial={{ y: 0 }}
                                        animate={{
                                            y: screenSize.isXs
                                                ? 190
                                                : screenSize.isSm
                                                ? 190
                                                : screenSize.isMd
                                                ? 180
                                                : screenSize.isLg
                                                ? 220
                                                : 280,
                                        }}
                                        variants={{
                                            hover: { y: 0 },
                                        }}
                                        transition={{ type: 'tween' }}
                                    >
                                        <motion.div
                                            className="text-white p-5"
                                            initial={{ y: 0 }}
                                            animate={{
                                                y: screenSize.isXs
                                                    ? -180
                                                    : screenSize.isSm
                                                    ? -180
                                                    : screenSize.isMd
                                                    ? -170
                                                    : screenSize.isLg
                                                    ? -140
                                                    : -200,
                                            }}
                                            variants={{
                                                hover: { y: 0 },
                                            }}
                                            transition={{ type: 'tween' }}
                                            onMouseEnter={() =>
                                                setIsShowContentCategory(index)
                                            }
                                            onMouseLeave={() =>
                                                setIsShowContentCategory(null)
                                            }
                                        >
                                            <h3 className=" max-md:text-lg max-md:mb-2 max-md:font-normal text-2xl font-semibold blur-none mb-2">
                                                {blockRoom.name}
                                            </h3>
                                            <p
                                                className={`mb-6 max-md:text-xs ${
                                                    isShowContentCategory ===
                                                    index
                                                        ? ''
                                                        : 'min-h-12 line-clamp-2 overflow-hidden'
                                                }  `}
                                            >
                                                {blockRoom.description}
                                            </p>
                                            <button
                                                className="bg-red-800 hover:brightness-110
                                                             max-lg:text-sm  max-md:text-xs max-lg:px-5 max-lg:py-3 px-10 py-4 
                                                             text-base rounded-full max-md:px-4 max-md:py-2"
                                            >
                                                <Link
                                                    to={`/room/${blockRoom.link}`}
                                                >
                                                    Khám phá ngay
                                                </Link>
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </motion.div>
            {/* Các button điều hướng nằm ngoài Swiper */}
            <div className="swiper-button-prev  max-lg:top-[70%] max-lg:left-2.5 max-lg:translate-x-2.5 max-md:hidden">
                <FontAwesomeIcon
                    icon={faCaretLeft}
                    className="text-gray-500 bg-white px-3.5 py-1.5 rounded-full shadow-btn-slider"
                />
            </div>
            <div className="swiper-button-next max-lg:top-[70%] max-lg:right-0 max-md:hidden">
                <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-gray-500 bg-white px-3.5 py-1.5 rounded-full shadow-btn-slider"
                />
            </div>
        </div>
    );
}

export default IntroductionHome;
