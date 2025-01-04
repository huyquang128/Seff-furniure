import note_edit from '@/assets/svg/note-edit.svg';
import PaginationCommon from '@/components/common/Pagination';
import { getBlogPage } from '@/redux/blogSlice';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

function BlogAd() {
    const blogRedux = useSelector((state) => state?.blog);

    const setIsShowProductModal = () => {};

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-10">
                <div className="text-xl text-text-first font-medium">Blog</div>
                <button className="flex py-3.5 px-8 bg-black text-white rounded-lg text-sm gap-2">
                    <img src={note_edit} alt="" className="h-5" />
                    <div onClick={() => setIsShowProductModal(true)}>
                        Viết Blog
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1
                            max-md:gap-10 gap-4 mb-10">
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

            <PaginationCommon
                totalPage={blogRedux.blogs?.totalBlog}
                getPageFunc={getBlogPage}
                pageSize={6}
            />
        </div>
    );
}

export default BlogAd;
