import Banner_2 from '@/assets/image/Banner_2.jpeg';
import arr_right_red from '@/assets/svg/arr_right_red.svg';
import arr_right_black from '@/assets/svg/arr_right_black.svg';
import search from '@/assets/svg/search.svg';

function Blog() {
    return (
        <div
            className="mt-[200px] max-w-[1440px] mx-auto px-[68px] grid grid-cols-3 gap-5
                        max-lg:px-3"
        >
            <div className="flex text-sm col-span-3">
                <div>Trang chủ</div>
                <img src={arr_right_black} alt="" />
                <div className="font-medium">Blog</div>
            </div>

            {/* search */}
            <div className="col-span-3 flex justify-between items-center ">
                <h1 className="font-semibold text-lg ">Blog</h1>
                <div className="border rounded-lg px-2.5 w-1/3 max-md:w-2/3 flex py-2 gap-3 items-center">
                    <img src={search} alt="" className="h-4 " />
                    <input
                        type="text"
                        className="placeholder:text-sm placeholder:text-gray-500"
                        placeholder="Tìm kiếm bài viết ở đây..."
                    />
                </div>
            </div>

            {/* block blog top */}
            <div className="col-span-2 max-md:col-span-3 text-black-base">
                <img
                    src={Banner_2}
                    alt=""
                    className="h-96 w-full object-cover rounded-lg mb-5"
                />
                <h1 className="mb-2 font-semibold">
                    LET'S COME HOME (OFFICIAL MV)
                </h1>
                <div className="flex gap-2 text-xs items-center">
                    <span className="">trangnguyen </span>
                    <span className="-translate-y-1.5 text-xl">.</span>
                    <span>24, 1, 2024</span>
                </div>
                <div className="mt-2 text-sm">
                    COME HOME X DƯƠNG KHẮC LINH COME HOME - Thương hiệu cung cấp
                    giải pháp trang trí nội thất cho người Việt với phong cách
                    hiện đại thuộc tập đoàn Central Retail Việt Nam.Với mô hình
                    cửa hàng “Một điểm đến” (One-stop shopping) lần đầu tiên
                    xuất hiện tại Việt
                </div>
                <div className="flex text-sm text-red-700 font-medium mt-3">
                    <div>Xem chi tiết</div>
                    <img src={arr_right_red} alt="" />
                </div>
            </div>

            {/*  */}
            <div className="max-md:col-span-3">
                <div className="mb-2 text-black-base">NHÓM</div>
                <div className="flex text-xs text-slate-600 gap-3 mb-4">
                    <div className="bg-gray-200 py-1 px-3 rounded-full">
                        News(31)
                    </div>
                    <div className="bg-gray-200 py-1 px-3 rounded-full">
                        Blog(125)
                    </div>
                </div>
                <div className="mb-2">RECENT POSTS</div>
                <div className="flex gap-3 items-start">
                    <img
                        src={Banner_2}
                        alt=""
                        className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="text-sm text-black-base">
                        <div className="font-medium">
                            orem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed condimentum, velit in vulputate tristique,
                            justo
                        </div>
                        <div className="flex gap-2 text-xs items-center">
                            <span className="">trangnguyen </span>
                            <span className="-translate-y-1.5 text-xl">.</span>
                            <span>24, 1, 2024</span>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="col-span-3 text-xl font-medium mt-10">
                SỰ KIỆN NỔI BẬT
            </div>
            <div className="col-span-3 text-sm font-medium">
                Khám phá các bài viết mới nhất từ Homecor để cập nhật thông tin
                mới nhất, tìm hiểu về các mẹo lựa chọn đồ nội thất, ý tưởng
                trang trí nội thất sáng tạo cho ngôi nhà của bạn!
            </div>

            <div
                className="col-span-3 grid grid-cols-3 gap-10 mb-20 text-black-base
                            max-md:grid-cols-1"
            >
                <div className="col-span-1">
                    <img
                        src={Banner_2}
                        alt=""
                        className="h-52 max-md:h-80 w-full object-cover rounded-lg mb-5"
                    />
                    <h1 className="mb-2">LET'S COME HOME (OFFICIAL MV)</h1>
                    <div className="flex gap-2 text-xs items-center">
                        <span className="">trangnguyen </span>
                        <span className="-translate-y-2 text-xl">.</span>
                        <span>24, 1, 2024</span>
                    </div>
                    <div className="mt-2 text-sm">
                        COME HOME X DƯƠNG KHẮC LINH COME HOME - Thương hiệu cung
                        cấp giải pháp trang trí nội thất cho người Việt với
                        phong cách hiện đại thuộc tập đoàn Central Retail Việt
                        Nam.Với mô hình cửa hàng “Một điểm đến” (One-stop
                        shopping) lần đầu tiên xuất hiện tại Việt
                    </div>
                    <div className="flex text-sm text-red-700 font-medium mt-3">
                        <div>Xem chi tiết</div>
                        <img src={arr_right_red} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
