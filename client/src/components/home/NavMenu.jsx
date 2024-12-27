import { getAllMenuNav } from '@/redux/menuNav';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import living_1 from '@/assets/image/living-1.jpg';
import living_2 from '@/assets/image/living-2.jpg';
import sleep_1 from '@/assets/image/sleep-1.jpg';
import sleep_2 from '@/assets/image/sleep-2.jpg';
import eat_1 from '@/assets/image/eat-1.jpg';
import eat_2 from '@/assets/image/eat-2.jpg';
import blog_1 from '@/assets/image/blog-1.jpg';
import blog_2 from '@/assets/image/blog-2.jpg';
import work_1 from '@/assets/image/work-1.jpg';
import work_2 from '@/assets/image/work-2.jpg';
import { motion } from 'framer-motion';

const navBarRoom = [
    {
        img: living_1,
        titleRoom: 'Phòng khách',
        title: 'PHÒNG KHÁCH MODERN SIMPLICITY',
        des: 'Với bộ sưu tập đa dạng đồ nội thất phòng khách của chúng tôi, chúng tôi hy vọng mang đến rất nhiều lựa chọn phù hợp với phong cách và không gian của bạn.',
        link: '/room/living-room',
    },
    {
        img: living_2,
        titleRoom: 'Phòng khách',
        title: 'PHÒNG KHÁCH MODERN INTERNATIONAL',
        des: 'Come Home hiểu rằng nội thất phòng khách không chỉ để thể hiện phong cách cá nhân mà còn tạo ra một không gian ấm cúng và hấp dẫn cho bạn, gia đình và bạn bè.',
        link: '/room/living-room',
    },
    {
        img: sleep_1,
        titleRoom: 'Phòng ngủ',
        title: 'Phòng ngủ Modern Simplicity',
        des: 'Giấc ngủ là một phần quan trọng trong cuộc sống của bạn. Come Home mong muốn giúp bạn tạo ra một không gian ngủ hoàn hảo và trọn vẹn nhất. ',
        link: '/room/bed-room',
    },
    {
        img: sleep_2,
        titleRoom: 'Phòng ngủ',
        title: 'Phòng ngủ Vietnamese Root',
        des: 'Với các bộ sưu tập đa dạng về giường, nệm, khăn trải giường và các sản phẩm chăn ga gối nệm khác',
        link: '/room/bed-room',
    },
    {
        img: eat_1,
        titleRoom: 'Bếp & Phòng Ăn',
        title: 'Bếp & Phòng Ăn Modern Simplicity',
        des: 'Come Home hiểu rằng bàn ăn không chỉ đơn thuần là một món đồ nội thất, mà nó còn là trái tim của những kỷ niệm gia đình',
        link: '/room/kitchen',
    },
    {
        img: eat_2,
        titleRoom: 'Bếp & Phòng Ăn',
        title: 'Bếp & Phòng Ăn Modern International',
        des: 'Come Home tập trung vào việc cung cấp đa dạng các lựa chọn để giúp bạn tạo ra trải nghiệm ăn uống hoàn hảo, phù hợp với phong cách và sở thích riêng của gia đình bạn.',
        link: '/room/kitchen',
    },
    {
        img: work_1,
        titleRoom: 'Phòng Làm Việc',
        title: 'Phòng làm việc',
        des: 'Sản phẩm của chúng tôi được sản xuất với công nghệ mới nhất và tiên tiến nhất giúp đảm bảo sự thoải mái và hiệu quả sử dụng tối đa. Mua ngay và tận hưởng!',
        link: '/room/work-room',
    },
    {
        img: work_2,
        titleRoom: 'Phòng Làm Việc',
        title: 'Phòng làm việc',
        des: 'Hãy khám phá những chiếc bàn và ghế tiện ích của Come Home sẽ giúp bạn làm việc hiệu quả hoặc giải trí được thoải mái hơn. ',
        link: '/room/work-room',
    },
    {
        img: blog_1,
        titleRoom: 'Blog',
        title: 'Bản tin sự kiện',
        des: 'Điểm nhanh những tin tức và sự kiện hấp dẫn của Come Home! Cập nhật nhiều hoạt động thú vị, từ các chương trình workshop độc đáo đến những ưu đãi đãi đặc biệt chỉ có tại Come Home',
        link: '/room/living-room',
    },
    {
        img: blog_2,
        titleRoom: 'Blog',
        title: 'Góc Nội ThấtL',
        des: 'Khám phá bí quyết trang trí và bố trí nội thất độc đáo cùng Come Home. Hãy cùng chúng tôi biến ngôi nhà của bạn thành không gian sống lý tưởng với những mẹo hay và xu hướng mới nhất.',
        link: '/room/living-room',
    },
];

function NavMenu() {
    const location = useLocation();
    const [openNavmenuLv2, setOpenNavmenuLv2] = useState(null);
    const [isAlreadyDirectionRoom, setIsDirectionRoom] = useState(false);

    const allMenuNav = useSelector((state) => state.menuNav.menuNav);
    const [isCloseNavMenuAnimation, setIsCloseModalAnimation] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMenuNav());
    }, [dispatch]);

    useEffect(() => {
        location.pathname.includes('room')
            ? setIsDirectionRoom(true)
            : setIsDirectionRoom(false);
    }, []);

    const handleHoverMenuLv1 = (id) => {
        setOpenNavmenuLv2(id);
    };

    const handleCloseMenuLv2 = () => {
        setIsCloseModalAnimation(true);

        setTimeout(() => {
            setOpenNavmenuLv2(null);
            setIsCloseModalAnimation(false);
        }, 300);
    };

    return (
        <ul
            className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 flex justify-between 
                            gap-3 cursor-pointer "
        >
            {allMenuNav?.map((item) => (
                <div key={item._id} className="">
                    <li
                        className="text-white py-2 text-sm"
                        onMouseMove={() => handleHoverMenuLv1(item._id)}
                        // onMouseLeave={() => setOpenNavmenuLv2(null)}
                        onMouseLeave={handleCloseMenuLv2}
                    >
                        <Link
                            to={
                                (item.title === 'About' && `/${item.link}`) ||
                                (item.title === 'Blog' && `/${item.link}`) ||
                                `/room/${item.link}`
                            }
                        >
                            {item.title}
                        </Link>
                        {openNavmenuLv2 === item._id && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        openNavmenuLv2 &&
                                        !isCloseNavMenuAnimation
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="absolute right-0 left-0 top-[35px] bg-white shadow-xl"
                                onMouseEnter={() => setOpenNavmenuLv2(item.id)}
                                onMouseLeave={() => setOpenNavmenuLv2(null)}
                            >
                                {/* child menu */}
                                <div className="grid grid-cols-5 max-w-[1440px] overflow-y-scroll mx-auto max-xl:px-[56px] max-lg:px-0">
                                    <div className=" col-span-2 grid grid-cols-2 h-[340px] ">
                                        {item.children.map((itemChild) => {
                                            return (
                                                <div
                                                    key={itemChild._id}
                                                    className="text-black max-xl:px-3 col-span-1 text-sm font-medium pt-4"
                                                >
                                                    <Link
                                                        to={`/room/${item.link}/${itemChild.link}`}
                                                    >
                                                        {itemChild.title}
                                                    </Link>
                                                    <ul
                                                        className=""
                                                        onMouseEnter={() =>
                                                            setOpenNavmenuLv2(
                                                                item.id
                                                            )
                                                        }
                                                        // onMouseLeave={() =>
                                                        // setOpenNavmenuLv2(null)
                                                        // }
                                                    >
                                                        {/* sub child menu */}
                                                        {itemChild.subChildren.map(
                                                            (
                                                                itemSubChild,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            itemSubChild._id
                                                                        }
                                                                        className="text-black font-normal py-2 "
                                                                    >
                                                                        <Link
                                                                            to={
                                                                                isAlreadyDirectionRoom
                                                                                    ? `${item.link}/${itemChild.link}/${itemSubChild.link}`
                                                                                    : `/room/${item.link}/${itemChild.link}/${itemSubChild.link}`
                                                                            }
                                                                        >
                                                                            {
                                                                                itemSubChild.title
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="col-span-3 grid grid-cols-2 gap-5 mb-5 max-xl:mr-2 pt-4">
                                        {navBarRoom.map((room, index) => {
                                            if (item.title === room.titleRoom) {
                                                return (
                                                    <Link
                                                        key={index}
                                                        to={room.link}
                                                    >
                                                        <div className="text-black col-span-1">
                                                            <img
                                                                src={room.img}
                                                                alt=""
                                                                className="h-50 w-full rounded-lg mb-7"
                                                            />
                                                            <h3 className="font-normal text-xl mb-3 max-lg:text-base">
                                                                {room.title}
                                                            </h3>
                                                            <p className="text-xs text-gray-500">
                                                                {room.des}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </li>
                </div>
            ))}
        </ul>
    );
}

export default NavMenu;
