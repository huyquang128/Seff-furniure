import note_edit_black from '@/assets/svg/note_edit_black.svg';
import note_edit from '@/assets/svg/note-edit.svg';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import arr_right_black from '@/assets/svg/admin/arr_right_black.svg';
import arr_right_white from '@/assets/svg/admin/arr_right_white.svg';
import arr_right_gray from '@/assets/svg/admin/arr_right_gray.svg';
import arr_left_gray from '@/assets/svg/admin/arr_left_gray.svg';
import arr_left_white from '@/assets/svg/admin/arr_left_white.svg';
import arr_left_black from '@/assets/svg/admin/arr_left_black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsPage } from '@/redux/productSlice';
import ActiveImgTooltip from '../toolkits/ActiveImgTooltip';
import heart from '@/assets/svg/heart.svg';
import heart_red from '@/assets/svg/heart_red.svg';
import star from '@/assets/svg/star.svg';
import star_yellow from '@/assets/svg/star_yellow.svg';

function ProductAd() {
    const dispatch = useDispatch();

    //state redux
    const productPageList = useSelector(
        (state) => state?.products?.productPageList
    );

    //state react
    const [currentPage, setCurrentPage] = useState(1);
    // Số mục trên mỗi trang
    const totalItems = 100; // Tổng số mục
    const [urlImgActive, setUrlImgActive] = useState(null);
    const [urlImgHover, setUrlImgHover] = useState(null);
    const [productIdActive, setProductIdActive] = useState(null);
    const [colorIdActive, setColorIdActive] = useState(null);
    const [productIdActiveModal, setProductIdActiveModal] = useState(null);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    //hook
    useEffect(() => {
        dispatch(getProductsPage(currentPage));
    }, [dispatch, currentPage]);

    //
    //handle Events
    const handleActiveImg = (urlImg, id, colorId) => {
        setUrlImgActive(urlImg);
        setProductIdActive(id);
        setColorIdActive(colorId);
    };

    const handleHoverActiveImg = (urlImg, id, colorId) => {
        setUrlImgHover(urlImg);
        setProductIdActiveModal(id);
        setColorIdActive(colorId);
    };

    const handleLeaveActiveImg = () => {
        setProductIdActiveModal(null);
        setColorIdActive(null);
    };
    return (
        <div className="px-10 py-5 ">
            <div className="flex justify-between items-center mb-10">
                <div className="text-xl text-text-first font-medium">
                    Danh sách sản phẩm
                </div>
                <button className="flex p-4 bg-black text-white rounded-lg text-sm gap-2">
                    <img src={note_edit} alt="" className="h-5" />
                    <div>Thêm sản phẩm</div>
                </button>
            </div>

            {/* products */}
            <div className="grid grid-cols-4 max-xl:gap-4 max-lg:grid-cols-3 gap-10 mb-10 text-text-first ">
                {productPageList.products.map((item) => (
                    <div
                        key={item._id}
                        className="bg-background rounded-xl transition-all ease-in-out duration-500"
                    >
                        <img
                            src={
                                productIdActive === item._id
                                    ? urlImgActive
                                    : item.colors[0].images[0]
                            }
                            alt=""
                            className="w-full h-[310px] max-lg:h-[250px]  max-md:h-[200px] rounded-lg mb-4 object-cover"
                        />
                        <div className="text-xs text-gray-500 mx-2 ">
                            {item.subChildMenu}
                        </div>
                        <div className="font-semibold  mx-2 mb-1 hover:underline">
                            {item.name}
                        </div>
                        <div className="mx-2 font-medium mb-3">
                            {item.price.toLocaleString('VN-vn')}đ
                        </div>
                        <div className="mx-2 mb-2 flex gap-3 relative">
                            {item.colors.map((srcImg, index) => (
                                <img
                                    key={index}
                                    src={srcImg.images[0]}
                                    onClick={() =>
                                        handleActiveImg(
                                            srcImg.images[0],
                                            item._id,
                                            srcImg.colorId
                                        )
                                    }
                                    onMouseEnter={() =>
                                        handleHoverActiveImg(
                                            srcImg.images[0],
                                            item._id,
                                            srcImg.colorId
                                        )
                                    }
                                    onMouseLeave={handleLeaveActiveImg}
                                    alt=""
                                    className={`${
                                        urlImgHover === srcImg.images[0]
                                            ? 'border border-yellow-base'
                                            : ''
                                    } ${
                                        urlImgActive === srcImg.images[0]
                                            ? 'border border-yellow-base'
                                            : ''
                                    } h-7 w-7 rounded-sm cursor-pointer`}
                                />
                            ))}
                            {productIdActiveModal === item._id && (
                                <ActiveImgTooltip
                                    urlImgHover={urlImgHover}
                                    colorIdActive={colorIdActive}
                                />
                            )}
                        </div>
                        {/* rating color */}
                        <div className="mx-2 mb-2 flex justify-between items-center pb-4">
                            <div className="flex gap-1">
                                <img src={star} alt="" className="h-4" />
                                <img src={star} alt="" className="h-4" />
                                <img src={star} alt="" className="h-4" />
                                <img src={star} alt="" className="h-4" />
                                <img src={star} alt="" className="h-4" />
                            </div>
                            <div className="mx-2 bg-bg-slider p-2 rounded-full cursor-pointer ">
                                <img src={heart} alt="" className="h-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* pagination */}
            <div className="flex justify-center cursor-pointer mb-10">
                <Pagination
                    current={currentPage} // Trang hiện tại
                    total={totalItems} // Tổng số mục
                    pageSize={productPageList?.totalPages} // Số mục trên mỗi trang
                    onChange={onChangePage} // Hàm xử lý khi chuyển trang
                    className="flex gap-3 items-center"
                    showLessItems
                    itemRender={(page, type, originalElement) => {
                        if (type === 'prev') {
                            return (
                                <button className="border border-gray-200 px-4 py-3.5 rounded-md">
                                    <img src={arr_left_black} alt="" />
                                </button>
                            );
                        }
                        if (type === 'next') {
                            return (
                                <button className="border border-gray-200 px-4 py-3.5 rounded-md">
                                    <img src={arr_right_black} alt="" />
                                </button>
                            );
                        }
                        if (type === 'jump-prev' || type === 'jump-next') {
                            return <span>...</span>;
                        }
                        return (
                            <button
                                className={`px-4 py-2 border border-gray-300 rounded-md ${
                                    currentPage === page
                                        ? 'bg-orange-200 text-yellow-600'
                                        : ''
                                }`}
                            >
                                {page}
                            </button>
                        );
                    }}
                />
            </div>
        </div>
    );
}

export default ProductAd;
