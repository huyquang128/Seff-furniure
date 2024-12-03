import notification from '@/assets/image/notification.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Notification() {
    const [ref, inView] = useInView({ threshold: 1, triggerOnce: true });

    return (
        <div
            ref={ref}
            className="max-w-[1440px] mx-auto max-xl:px-[68px] max-lg:px-3
                     gap-5 mt-32 max-sm:mx-4 max-md:mt-20 "
        >
            <div
                className="
                     flex max-md:flex-col max-lg:justify-start max-md:gap-8 items-center 
                     max-md:items-start max-md:justify-start"
            >
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="flex w-4/12 justify-center  items-center gap-4 max-md:w-full max-md:justify-start "
                >
                    <img src={notification} alt="" className="h-[30px]" />
                    <h3 className="text-4xl font-medium">Thông báo</h3>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="w-8/12 max-md:w-full"
                >
                    <h4 className="text-lg font-medium mb-2">
                        Nhanh chóng hơn, dễ dàng hơn
                    </h4>
                    <p className="text-sm mb-4">
                        Homecor luôn cố gắng đáp ứng nhu cầu và đem lại sự hài
                        lòng khi mua sắm cho khách hàng, chính vì vậy một số sản
                        phẩm nội thất giá phổ thông tại Come Home đã có sẵn tại
                        cửa hàng để quý khách có thể mua và mang về trực tiếp.
                    </p>
                    <p className="text-sm mb-4">
                        Bên cạnh đó, nhằm tối ưu trải nghiệm mua sắm của khách
                        hàng, Homecor giờ đây cũng đã có dịch vụ Đặt hàng online
                        và Nhận đơn tại cửa hàng. Bạn chỉ cần đặt sản phẩm yêu
                        thích trên Website/App Homecor. Khi sản phẩm đã sẵn
                        sàng, chúng tôi sẽ thông báo và bạn có thể đến lấy trực
                        tiếp vào các ngày trong tuần. Mọi thắc mắc, xin vui lòng
                        liên hệ 1900 9101
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default Notification;
