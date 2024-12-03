import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import slider1 from '@/assets/image/slider-1.jpg';
import slider2 from '@/assets/image/slider-2.jpg';
import slider4 from '@/assets/image/slider-4.jpg';
import slider3 from '@/assets/image/slider-3.png';
import slider5 from '@/assets/image/slider-5.jpg';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const sliderShows = [
    {
        src: slider1,
        description: 'Khám phá những thiết kế nội thất tinh tế',
        sub_desc:
            'Nơi mọi chi tiết đều được chăm chút để mang lại sự tiện nghi và thẩm mỹ.',
        link: 'room/kitchen',
    },
    {
        src: slider2,
        description: 'Với các thiết kế nội thất thông minh',
        sub_desc: 'Tận dụng tối đa diện tích không gian.',
        link: 'room/living-room',
    },
    {
        src: slider3,
        description: 'Mang đến không gian sống hoàn hảo',
        sub_desc: 'Với các giải pháp nội thất thông minh và hiện đại.',
        link: 'room/living-room',
    },
    {
        src: slider4,
        description: 'Bộ sưu tập nội thất cao cấp',
        sub_desc: 'Nâng tầm không gian mà còn truyền cảm hứng cho cuộc sống.',
        link: 'room/bed-room',
    },
    {
        src: slider5,
        description: 'Chúng tôi tạo ra những sản phẩm nội thất',
        sub_desc: 'Giúp ngôi nhà của bạn trở nên ấm áp và đẳng cấp hơn.',
        link: 'room/work-room',
    },
];

function SliderShow() {
    const [activeSlide, setActiveSlide] = useState(false);
    return (
        <div>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                }}
                speed={2000}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                modules={[Pagination, Autoplay, EffectFade]}
                className="w-full h-screen transition-all ease-linear duration-300"
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            >
                {sliderShows.map((slider, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={slider.src}
                            alt=""
                            className=" object-cover w-full h-full brightness-50 max-md:object-fill"
                        />
                        <div className="absolute max-lg:w-9/12 max-sm:w-11/12 bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2">
                            <motion.div
                                initial={{ y: '50%', opacity: 0 }}
                                animate={
                                    activeSlide === index
                                        ? { y: '0', opacity: 1 }
                                        : { y: '50%', opacity: 0 }
                                }
                                transition={{ duration: 0.5 }}
                                className="text-white text-7xl max-lg:text-4xl max-md:text-3xl text-center 
                                            font-light mb-5 leading-tight"
                            >
                                {slider.description}
                            </motion.div>
                            <motion.div
                                initial={{ y: '100%', opacity: 0 }}
                                animate={
                                    activeSlide === index
                                        ? { y: '0', opacity: 1 }
                                        : { y: '100%', opacity: 0 }
                                }
                                transition={{ duration: 0.9 }}
                                className="text-white text-xl max-lg:text-lg max-md:text-sm text-center mb-10 font-light"
                            >
                                {slider.sub_desc}
                            </motion.div>
                            <motion.div
                                initial={{ y: '100%', opacity: 0 }}
                                animate={
                                    activeSlide === index
                                        ? { y: '0', opacity: 1 }
                                        : { y: '100%', opacity: 0 }
                                }
                                transition={{ duration: 1.1 }}
                                className="text-center"
                            >
                                <button
                                    className="px-12 text-center py-4 max-md:px-8 max-md:py-3 
                                    bg-yellow-base text-sm shadow-lg text-white hover:brightness-105
                                    rounded-sm"
                                >
                                    <Link to={slider.link}>Xem thêm</Link>
                                </button>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SliderShow;
