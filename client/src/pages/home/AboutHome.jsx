import banner from '@/assets/image/Banner_2.jpeg';
import bedroom from '@/assets/image/bedroom.jpg';
import sofa from '@/assets/image/sofa.jpg';
import livingroom_1 from '@/assets/image/livingroom-1.jpg';
import Fa_COMEHOME_3D_KV_BG from '@/assets/image/Fa_COMEHOME_3D_KV_BG.jpg';
import Come_Home_080723_0980 from '@/assets/image/Come_Home_080723_0980.jpg';
import Come_Home_080723_1030 from '@/assets/image/Come_Home_080723_1030.jpg';

const arr = [
    { title: 'MODERN SIMPLICITY', src: livingroom_1 },
    { title: 'MODERN INTERNATIONAL', src: bedroom },
    { title: 'VIETNAMESE ROOTS', src: sofa },
];
function AboutHome() {
    return (
        <div className="">
            <img
                src={banner}
                alt=""
                className="min-h-screen mb-6 object-cover max-md:min-h-52 max-md:mt-20"
            />
            <div className="max-w-[1440px] px-[68px] max-lg:px-[5px] m-auto grid grid-cols-7 gap-4">
                <h1 className="text-2xl col-span-2 max-md:col-span-7 max-md:text-lg max-sm:text-md  text-black-text ">
                    Thành lập từ năm 2023
                </h1>
                <div className="text-lg text-center col-span-5 mb-6 max-md:col-span-7">
                    <h1
                        className="text-2xl tracking-[3.9px]  text-yellow-base mb-4 
                                text-start max-lg:tracking-[1px] max-md:text-xl"
                    >
                        HOMECOR LÀ MỘT THÀNH VIÊN CỦA TẬP ĐOÀN CENTRAL RETAIL
                    </h1>
                    <div className="text-sm text-gray-700 mb-10 text-start">
                        HOMECOR tự hào là điểm đến “One-Stop Shopping” đầu tiên
                        của nhịp sống hiện đại tại Việt Nam, nơi cung cấp nhiều
                        sản phẩm nội thất được thiết kế độc quyền, chất lượng
                        quốc tế với giá cả phải chăng với 3 nhóm phong cách:
                    </div>
                    <div className="flex gap-10 mb-10 max-md:justify-between max-md:gap-0">
                        {arr.map((title, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-4 min-w-52 max-md:min-w-36"
                            >
                                <img
                                    src={title.src}
                                    alt=""
                                    className="max-w-48 h-48 max-md:w-28 max-md:h-28 rounded-full overflow-hidden "
                                />
                                <div className="font-semibold text-black-text max-md:text-sm max-sm:text-xs">
                                    {title.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className="text-2xl tracking-[2px] text-yellow-base text-start mb-4
                                    max-md:tracking-[1px] max-md:text-lg"
                    >
                        SỨ MỆNH CỦA CHÚNG TÔI: CẢI THIỆN CUỘC SỐNG TẠI GIA CHO
                        MỌI NGƯỜI
                    </div>
                    <div className="text-sm text-start">
                        Homecor luôn cam kết thực hiện sứ mệnh nâng cao chất
                        lượng cuộc sống của các gia đình Việt thông qua những
                        sản phẩm nội thất tân tiến và độc đáo. Mục tiêu của
                        chúng tôi là trở thành điểm mua sắm nội thất tin cậy cho
                        ngôi nhà mơ ước của khách hàng, một nơi chốn đầy đủ tiện
                        nghi để mọi người an tâm tận hưởng cuộc sống.
                    </div>
                </div>
                <img
                    src={Fa_COMEHOME_3D_KV_BG}
                    alt=""
                    className="col-span-7 rounded-xl mb-10"
                />
                <div
                    className="text-2xl col-span-2 text-black-text max-md:col-span-7
                max-md:text-lg"
                >
                    ROOM PLANER
                </div>
                <div className="col-span-5 max-md:col-span-7">
                    <h1
                        className="text-2xl tracking-[3.9px] text-yellow-base mb-4 max-lg:tracking-[1px]
                                    max-md:text-lg"
                    >
                        CHÚNG TÔI CUNG CẤP TRẢI NGHIỆM MUA SẮM ĐỘC ĐÁO TẠI CỬA
                        HÀNG VÀ MUA HÀNG TRỰC TUYẾN
                    </h1>
                    <div className="mb-5 max-md:text-sm">
                        Hãy sẵn sàng cho một trải nghiệm mua sắm mới lạ, hoàn
                        toàn độc quyền từ COME HOME. Với công nghệ đột phá, giờ
                        đây bạn có thể mua sắm trực tuyến các sản phẩm của chúng
                        tôi một cách trực quan hơn nhờ phần mềm kỹ thuật số Room
                        Planner, tạo sự tương tác với mô hình 3D của sản phẩm
                        cho bạn cảm giác như đang mua sắm thực tế tại cửa hàng.
                    </div>
                    <div className="mb-5">
                        Dù bạn mua sắm tại COME HOME với hình thức nào, chúng
                        tôi nỗ lực hết mình để mang đến trải nghiệm mua sắm hài
                        lòng nhất và tiện lợi nhất cho mọi khách hàn
                    </div>
                    <div className="flex gap-5 mb-10 items-center">
                        <div className="font-semibold text-lg text-black-text">
                            TRẢI NGHIỆM NGAY
                        </div>
                        <button className="p-3 bg-yellow-base rounded-xl text-white ">
                            Room Planner
                        </button>
                    </div>
                </div>
                <div className="flex col-span-7 mb-20 gap-3 max-md:gap-0.5">
                    <img
                        src={Come_Home_080723_0980}
                        alt=""
                        className="w-1/2 rounded-xl"
                    />
                    <img
                        src={Come_Home_080723_1030}
                        alt=""
                        className="w-1/2 rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutHome;
