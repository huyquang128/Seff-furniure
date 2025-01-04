import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import eat1 from '@/assets/image/eat-1.jpg';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBlogPage } from '@/redux/blogSlice';

function InfoHot() {
    const dispatch = useDispatch();
    const [ref, inView] = useInView({ threshold: 0.5 , triggerOnce: true });
    const blogRedux = useSelector((state) => state?.blog);

    //hook
    useEffect(() => {
        dispatch(getBlogPage(1));
    }, [dispatch]);

    return (
        <div
            ref={ref}
            className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 mb-20"
        >
            <motion.h2
                initial={{ opacity: 0, y: '-50%', x: 0 }}
                animate={inView ? { opacity: 1, y: '0', x: 0 } : { opacity: 0 }}
                transition={{ duration: 1.4 }}
                className="text-2xl font-semibold mb-10"
            >
                THÔNG TIN NỔI BẬT
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: '-50%', x: 0 }}
                animate={inView ? { opacity: 1, y: '0', x: 0 } : { opacity: 0 }}
                transition={{ duration: 1.4 }}
                className="font-medium text-sm mb-5"
            >
                Khám phá các bài viết mới nhất từ ​Homecor để cập nhật thông tin
                mới nhất, tìm hiểu về các mẹo lựa chọn đồ nội thất, ý tưởng
                trang trí nội thất sáng tạo cho ngôi nhà của bạn!
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: '50%', x: 0 }}
                animate={inView ? { opacity: 1, y: '0', x: 0 } : { opacity: 0 }}
                transition={{ duration: 1.4 }}
                className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-5 mb-10"
            >
                {blogRedux?.blogs?.map((item) => (
                    <div key={item._id}>
                        <img
                            src={item.image}
                            alt=""
                            className="h-[226px] w-full object-cover rounded-md mb-2"
                        />
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <div className="flex items-center gap-7 mb-2">
                            <span className="text-sm">{item.author}</span>
                            <span className="text-sm list-item">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm line-clamp-2 mb-4">
                            {item.content}
                        </p>
                        <button className="text-sm font-medium flex items-center gap-2 text-red-700 hover:brightness-110">
                            Xem chi tiết
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                ))}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: '50%', x: 0 }}
                animate={inView ? { opacity: 1, y: '0', x: 0 } : { opacity: 0 }}
                transition={{ duration: 1.6 }}
                className="text-center "
            >
                <button className="px-7 py-2.5 font-medium text-báe rounded-lg bg-red-800 text-white hover:brightness-125">
                    <Link to="/Blog">Xem thêm</Link>
                </button>
            </motion.div>
        </div>
    );
}

export default InfoHot;
