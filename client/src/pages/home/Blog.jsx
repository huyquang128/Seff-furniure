import Banner_2 from '@/assets/image/Banner_2.jpeg';
import arr_right_red from '@/assets/svg/arr_right_red.svg';
import arr_right_black from '@/assets/svg/arr_right_black.svg';
import search from '@/assets/svg/search.svg';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PaginationCommon from '@/components/common/Pagination';
import { getBlogPage } from '@/redux/blogSlice';

function Blog() {
    const blogRedux = useSelector((state) => state?.blog);

    return (
        <div
            className="mt-[180px] max-w-[1440px] mx-auto px-[68px] gap-5
                        max-lg:px-3 max-md:mt-28"
        >
            <div className="flex text-sm col-span-3 mb-3">
                <div>Trang chủ</div>
                <img src={arr_right_black} alt="" />
                <div className="font-medium">Blog</div>
            </div>
            <div
                className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1
                            max-md:gap-10 gap-4 mb-10"
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
            </div>
        </div>
    );
}

export default Blog;
