import {
    faFacebook,
    faInstagram,
    faTiktok,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '@/assets/image/logo.png';
import BoCongThuong_1_1 from '@/assets/image/BoCongThuong_1_1.png';
import { Link } from 'react-router-dom';
import appstore from '@/assets/image/appstore.png';
import googleplay from '@/assets/image/googleplay.png';
import download_1 from '@/assets/image/download_1.gif';
import Visa from '@/assets/image/Visa.png';
import JCB_1 from '@/assets/image/JCB_1.png';
import VNPAY_QR from '@/assets/image/VNPAY-QR.png';
import Mastercard from '@/assets/image/Mastercard.png';
import { useEffect, useState } from 'react';

const blockArr = [
    {
        id: 1,
        title: 'VỀ CHÚNG TÔI',
        children: [
            { title: 'Về Homecor', link: '', id: 1 },
            { title: 'Hệ thống của hàng', link: '', id: 1 },
        ],
    },
    {
        id: 2,
        title: 'DỊCH VỤ',
        children: [
            { id: 2, title: 'Chính sách giao hàng và lắp đặt', link: '' },
            { id: 2, title: 'Chính sách trả góp', link: '' },
            { id: 2, title: 'Chính sách bảo vệ dữ liệu', link: '' },
            { id: 2, title: 'Điều khoản và điều kiện', link: '' },
            { id: 2, title: 'Thiết kế miễn phí', link: '' },
        ],
    },
    {
        id: 3,
        title: 'CHĂM SÓC KHÁCH HÀNG',
        children: [
            { id: 3, title: 'Hướng dẫn tạo tài khoản', link: '' },
            { id: 3, title: 'Hướng dẫn mua hàng', link: '' },
            { id: 3, title: 'Ý kiến khách hàng', link: '' },
        ],
    },
];

function FooterHome() {
    const [openModelMenuFooter, setOpenModelMenuFooter] = useState(null);
    const [idParent, setIdParent] = useState(null);
    const [screenSize, setScreenSize] = useState({
        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
    });

    const handleClick = (id) => {
        setOpenModelMenuFooter(true);
        setIdParent(id);
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isXs: width <= 375,
                isSm: width > 375 && width <= 426,
                isMd: width > 426 && width <= 768,
                isLg: width > 768 && width <= 1025,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it once on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className=" bg-black-base  text-white pb-20">
            <div
                className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 pt-10 grid grid-cols-6 px-3 max-lg:mx-0 max-md:grid-cols-1"
            >
                {/*  */}
                <div className="col-span-2 mr-20 max-md:mb-10">
                    <div className="flex items-center  mb-5">
                        <h2 className="text-2xl font-sans font-semibold text-yellow-base">
                            HOMECOR.
                        </h2>
                    </div>
                    <div className="flex gap-6 mb-8 ">
                        <Link>
                            <FontAwesomeIcon
                                icon={faYoutube}
                                className="text-xl"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="text-xl"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="text-xl"
                            />
                        </Link>
                        <Link>
                            <FontAwesomeIcon
                                icon={faTiktok}
                                className="text-xl"
                            />
                        </Link>
                    </div>
                    <p className="mb-5 text-sm text-gray-500">
                        CÔNG TY TNHH EB BÌNH DƯƠNG Số 555B, Đại lộ Bình Dương,
                        Khu 1, phường Hiệp Thành, Thành phố Thủ Dầu Một, tỉnh
                        Bình Dương, Việt Nam
                    </p>
                    <p className="mb-5 text-sm text-gray-500">
                        Giấy chứng nhận kinh doanh Số 3702058398 do Sở kế hoạch
                        và đầu tư Tỉnh Bình Dương cấp ngày 04/06/2012
                    </p>
                    <p className="mb-5 text-sm text-gray-500">
                        Hotline: 1900 9101 Email: support@comehome.com.vn Giờ mở
                        cửa: 10:00 - 22:00, Thứ hai - Chủ nhật
                    </p>
                    <img src={BoCongThuong_1_1} alt="" />
                </div>

                {screenSize.isMd || screenSize.isSm ? (
                    blockArr.map((item, index) => (
                        <ul
                            key={index}
                            className="col-span-2 py-3 border-b border-b-zinc-500"
                        >
                            <h2
                                className=" font-semibold mb-4"
                                onClick={() => handleClick(item.id)}
                            >
                                {item.title}
                            </h2>
                            {item.id === idParent &&
                                item.children.map((child, index) => {
                                    console.log('child: ', child);
                                    return (
                                        <Link key={index}>
                                            <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                                {child.title}
                                            </li>
                                        </Link>
                                    );
                                })}
                        </ul>
                    ))
                ) : (
                    <>
                        <ul>
                            <h2 className=" font-semibold mb-4">
                                VỀ CHÚNG TÔI
                            </h2>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Về Come Home
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Hệ Thống Cửa Hàng
                                </li>
                            </Link>
                        </ul>

                        <ul>
                            <h2 className=" font-semibold mb-4">DỊCH VỤ</h2>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Chính Sách Giao Hàng & Lắp Đặt
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Chính sách trả góp
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Chính sách bảo mật dữ liệu
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Điều khoản & Điều kiện
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Thiết kế miễn phí
                                </li>
                            </Link>
                        </ul>

                        <ul>
                            <h2 className=" font-semibold mb-4">
                                CHĂM SÓC KHÁCH HÀNG
                            </h2>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Hướng dẫn tạo tài khoản
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Hướng dẫn mua hàng
                                </li>
                            </Link>
                            <Link>
                                <li className="text-sm text-gray-500 py-2 hover:text-white ">
                                    Ý kiến khách hàng
                                </li>
                            </Link>
                        </ul>
                    </>
                )}

                {/*  */}
                <div className="max-md:mt-5">
                    <div className="mb-10">
                        <h2 className=" font-semibold mb-4">
                            TẢI XUỐNG ỨNG DỤNG
                        </h2>
                        <div className="flex gap-3">
                            <img src={download_1} alt="" className="h-16" />
                            <div className="flex flex-col gap-3">
                                <img src={appstore} alt="" />
                                <img src={googleplay} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className=" font-semibold mb-4">
                            PHƯƠNG THỨC THANH TOÁN
                        </h2>
                        <div className="flex gap-3 flex-wrap">
                            <img src={Visa} alt="" className="h-5" />
                            <img src={Mastercard} alt="" className="h-5" />
                            <img src={JCB_1} alt="" className="h-5" />
                            <img src={VNPAY_QR} alt="" className="h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterHome;
