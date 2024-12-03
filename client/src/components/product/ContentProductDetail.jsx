/* eslint-disable react/prop-types */
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import share from '@/assets/svg/share.svg';
import fb from '@/assets/svg/fb.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity,
    setIdProduct,
    updateColor,
    updateQuantity,
} from '@/redux/cartSlice';
import { Bounce, toast } from 'react-toastify';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { getProductSingleByName, recommendProduct } from '@/redux/productSlice';
import note_edit from '@/assets/svg/note-edit.svg';
import ReviewModal from '../modals/ReviewModal';
import { listStar } from '../common/ListStar';
import { getReviewsByProductId } from '@/redux/reviewSlice';
import check_circle from '@/assets/svg/check_circle.svg';
import arr_right_black from '@/assets/svg/arr_right_black.svg';
import ToastMessage from '../common/ToastMessage';

function ContentProductDetail({ productName }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const location = useLocation();
    // const locationCurrent = location.pathname;

    //state redux
    const singleProductDetail = useSelector(
        (state) => state.products?.singleProductDetail
    );
    const productId = singleProductDetail?._id;
    const user = useSelector((state) => state.auth?.user);
    const quantity = useSelector((state) => state.cart?.quantity);
    const colorName = useSelector((state) => state.cart?.color);
    const totalPriceProduct = useSelector(
        (state) => state.cart?.totalPriceProduct
    );
    const productRecommends = useSelector(
        (state) => state?.products.productsRecommended
    );
    const reviewStore = useSelector((state) => state?.review.reviews);
    const averageStarNumber = useSelector((state) => state?.review.averageStar);
    const reviewsRedux = useSelector((state) => state?.review);
    // const user = useSelector(
    //     (state) => state?.auth?.user
    // );

    //state react
    const [selectInfoReviewBtn, setSelectInfoReviewBtn] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeColorImage, setActiveColorImage] = useState(0);
    const [isShowReviewModal, setIsShowReviewModal] = useState(false);

    //hooks
    useEffect(() => {
        dispatch(getProductSingleByName(productName));
    }, [dispatch]);

    useEffect(() => {
        if (productId) dispatch(getReviewsByProductId(productId));
    }, [dispatch, productId]);

    //handle events
    const handleClickColorImage = (id, nameColor) => {
        setActiveColorImage(id);
        dispatch(updateColor(nameColor));
    };

    const handleRedirectToDetail = (productName, productId) => {
        console.log('🚀 ~ handleRedirectToDetail ~ productName:', productName);
        dispatch(setIdProduct(productId));
        dispatch(recommendProduct(productId));
        dispatch(getProductSingleByName(productName)).then((response) => {
            if (response.data?.success) {
                navigate(`${productName}`);
            }
        });
    };

    const handleAddToCart = () => {
        const formData = new FormData();

        formData.append('userId', user?.id);
        formData.append('productId', singleProductDetail?._id);
        formData.append('quantity', quantity);
        formData.append('totalPriceProduct', totalPriceProduct);
        formData.append('nameProduct', productName);
        formData.append('price', singleProductDetail?.price);
        formData.append('imageUrl', singleProductDetail?.colors[0]?.images[0]);
        colorName.forEach((color) => {
            formData.append('color[]', color);
        });

        dispatch(addToCart(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success(`Đã thêm vào giỏ hàng ️🛒`, {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    transition: Bounce,
                });
            }
        });
    };

    const handleShowReviewModal = () => {
        if (user) {
            setIsShowReviewModal(true);
        } else {
            console.log('123');
            ToastMessage({
                message: 'Vui lòng đăng nhập để bình luận!',
                position: 'top-right',
                status: 'error',
            });
        }
    };

    return (
        <div className="max-w-[1440px] mx-auto max-xl:px-[68px] max-lg:px-3 mt-[190px] max-md:mt-32">
            <div className="mb-4 flex text-sm gap-1 items-center">
                <span className="cursor-pointer">
                    <Link to="/">Trang chủ</Link>
                </span>
                <img src={arr_right_black} alt="" className="h-4" />
                <span
                    className={`${
                        productName === singleProductDetail?.name
                            ? 'text-yellow-base font-medium'
                            : ''
                    }`}
                >
                    {productName}
                </span>
            </div>
            <div className="">
                {/* block left inner image and comment customer */}
                <div
                    className="grid grid-cols-3  max-md:grid-rows-none gap-10 
                                md-max:grid-cols-1 
                         "
                >
                    {/* top inner image and color image */}
                    <div className="col-span-2 max-md:col-span-3 max-md:mb-[60px]">
                        <div
                            className={`h-full rounded-lg  border-black
                                        max-md:h-[600px] max-lg:h-[600px] max-sm:h-[300px] 
                                         max-md:bg-bg-slider
                                        relative mb-5 `}
                        >
                            <Swiper
                                spaceBetween={10}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Thumbs]}
                                className="mySwiper2 h-full "
                            >
                                {singleProductDetail?.colors[
                                    activeColorImage
                                ]?.images.map((imageUrl, index) => (
                                    <SwiperSlide key={index} className="">
                                        <img
                                            src={imageUrl}
                                            alt=""
                                            className="w-full h-full rounded-lg "
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* <div className="absolute bottom-0 cursor-pointer p-4 gap-3 max-md:-bottom-24 max-md:p-0 "> */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                breakpoints={{
                                    375: {
                                        slidesPerView: 4,
                                    },
                                    425: { slidesPerView: 5 },
                                    768: { slidesPerView: 8 },
                                    1024: { slidesPerView: 7 },
                                    1440: { slidesPerView: 9 },
                                }}
                                freeMode={true}
                                slidesPerView={10}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Thumbs]}
                                className="mySwiper absolute w-full bottom-0 max-md:-mb-1 cursor-pointer m-4 gap-3 max-md:-bottom-24 max-md:p-0 "
                            >
                                {singleProductDetail?.colors[
                                    activeColorImage
                                ]?.images.map((imageUrl, index) => (
                                    <SwiperSlide key={index} className="">
                                        <img
                                            src={imageUrl}
                                            alt=""
                                            className="w-20 h-20 rounded-lg border"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {/* </div> */}
                        </div>
                    </div>

                    {/* block right */}
                    <div className=" max-md:col-span-3 row-span-2">
                        <div className="text-sm font-medium text-gray-600">
                            {singleProductDetail?.brand}
                        </div>
                        <div className="text-2xl font-semibold mb-4">
                            {singleProductDetail?.name}
                        </div>
                        <div className="font-semibold text-xl pb-4 border-b border-gray-100 mb-4">
                            {singleProductDetail?.price.toLocaleString('vn-VN')}{' '}
                            đ
                        </div>
                        <p className="text-sm mb-3">
                            {singleProductDetail?.description}
                        </p>
                        <div className="text-lg font-medium mb-2">
                            Tùy chọn sản phẩm
                        </div>
                        <div className=" mb-3 ">
                            Chất liệu:{' '}
                            <span className="text-gray-500 text-sm">
                                {singleProductDetail?.material}
                            </span>
                        </div>
                        <span className="">Màu sắc</span>
                        <div className="flex gap-3 mt-2 mb-4">
                            {singleProductDetail?.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                    onClick={() =>
                                        handleClickColorImage(
                                            index,
                                            color.colorId
                                        )
                                    }
                                >
                                    <img
                                        src={color.images[0]}
                                        alt=""
                                        className="h-20 rounded-lg border"
                                    />
                                    <span className="text-sm font-light">
                                        {color.colorId}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mb-2">Kích thước</div>
                        <div
                            className="bg-bg-slider w-4/12 rounded-md text-sm 
                                        flex justify-center py-2 "
                        >
                            {singleProductDetail?.size.width}x
                            {singleProductDetail?.size.height}x
                            {singleProductDetail?.size.length}cm
                        </div>
                        <div className="mb-3 mt-7 pt-4 border-t border-gray-100">
                            Số lượng
                        </div>
                        <div className="flex gap-5 mb-10 ">
                            <div className="border rounded-lg items-center w-4/12 flex py-3 justify-center">
                                {quantity > 1 && (
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        onClick={() =>
                                            dispatch(
                                                decreaseQuantity(
                                                    singleProductDetail?.price
                                                )
                                            )
                                        }
                                    />
                                )}

                                <input
                                    type="number"
                                    className="outline-none w-5/12 text-center"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(e) =>
                                        dispatch(
                                            updateQuantity({
                                                value: e.target.value,
                                                price: singleProductDetail?.price,
                                            })
                                        )
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() =>
                                        dispatch(
                                            increaseQuantity(
                                                singleProductDetail?.price
                                            )
                                        )
                                    }
                                />
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-red-700 px-3 py-1  rounded-full text-white"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mb-6 ">
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="font-medium text-gray-600 ">
                                Thêm vào yêu thích
                            </span>
                        </div>
                        <div className="mb-2">Chia sẻ</div>
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                            <div className="flex gap-2 items-center">
                                <img src={share} alt="" />
                                <span className="text-gray-600">chia sẻ</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <img src={fb} alt="" className="w-5" />
                                <span className="text-gray-600">facebook</span>
                            </div>
                        </div>

                        {/* remmened product */}
                        <div className="py-3">
                            <div className="text-md mb-4">SẢN PHẨM ĐỀ XUẤT</div>
                            {productRecommends?.map((product) => (
                                <div
                                    onClick={() =>
                                        handleRedirectToDetail(
                                            product.name,
                                            product._id
                                        )
                                    }
                                    key={product._id}
                                    className="flex gap-3 mb-5 cursor-pointer"
                                >
                                    <Link to={`/${product.name}`}>
                                        <img
                                            src={product.colors[0].images[0]}
                                            alt=""
                                            className="h-32 rounded-xl"
                                        />
                                        <div className="flex flex-col gap-2 text-sm font-medium">
                                            <span className=" text-base">
                                                {product.name}
                                            </span>
                                            <span className=" text-xl">
                                                {product.price.toLocaleString(
                                                    'VN-vn'
                                                )}
                                                đ
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* block info and review */}
                    <div className="col-span-2 max-md:col-span-3">
                        <ul className="flex  mb-5 cursor-pointer">
                            <li
                                className={`${
                                    selectInfoReviewBtn
                                        ? 'border-b text-yellow-base border-yellow-base '
                                        : ''
                                } p-3 `}
                                onClick={() => setSelectInfoReviewBtn(true)}
                            >
                                Thông tin sản phẩm
                            </li>
                            <li
                                className={`${
                                    !selectInfoReviewBtn
                                        ? 'border-b text-yellow-base border-yellow-base'
                                        : ''
                                } p-3 `}
                                onClick={() => setSelectInfoReviewBtn(false)}
                            >
                                Đánh giá
                            </li>
                        </ul>

                        {/* info product */}
                        {selectInfoReviewBtn ? (
                            <div className="p-3 mb-10">
                                <h1 className="font-bold text-xl mb-3">
                                    1. Chi tiết sản phẩm
                                </h1>
                                <span>Ghế bành HANOVER </span>
                                <p className="text-sm py-3 mb-4">
                                    {
                                        singleProductDetail?.infoProduct
                                            .detail_Product
                                    }
                                </p>
                                <h1 className="font-bold text-xl mb-3">
                                    2. Thông tin cần biết
                                </h1>
                                <p className="text-sm py-3 mb-4">
                                    {
                                        singleProductDetail?.infoProduct
                                            .Essential_Information
                                    }
                                </p>
                                <h1 className="font-bold text-xl mb-3">
                                    3. Tiêu chuẩn an toàn
                                </h1>
                                <p className="text-sm py-3 mb-4">
                                    {
                                        singleProductDetail?.infoProduct
                                            .Safety_Standards
                                    }
                                </p>
                                <h1 className="font-bold text-xl mb-3">
                                    4. Tiện ích của sản phẩm
                                </h1>
                                <p className="text-sm py-3 mb-4">
                                    {
                                        singleProductDetail?.infoProduct
                                            .Product_Features
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="mb-20">
                                {/* statistical rating */}
                                <div className="flex justify-between items-center mb-7">
                                    <span className="font-medium">
                                        Tất cả đánh giá
                                    </span>
                                    <button
                                        onClick={handleShowReviewModal}
                                        className="bg-black-second p-4 rounded-lg flex items-center gap-2"
                                    >
                                        <img src={note_edit} alt="" />
                                        <span className="text-white text-sm">
                                            {' '}
                                            Viết đánh giá
                                        </span>
                                    </button>
                                </div>
                                <div className="border border-gray-100 p-5 rounded-lg">
                                    <div className="text-sm font-medium mb-3">
                                        Khách hàng đánh giá
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">
                                            <div className="text-4xl font-extrabold mb-2">
                                                {averageStarNumber}
                                            </div>
                                            <div className="mb-3 flex gap-2 ">
                                                {listStar.map((star, index) => (
                                                    <div key={index}>
                                                        <img
                                                            src={
                                                                star.star_yellow
                                                            }
                                                            alt=""
                                                            className="h-6"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-sm  text-gray-500">
                                                ({reviewStore?.length} Đánh giá)
                                            </div>
                                        </div>

                                        {/*  */}
                                        <div className="w-6/12">
                                            <div className="text-sm font-medium flex justify-center gap-3 items-center mb-2">
                                                <span className="w-11 text-center">
                                                    5 sao
                                                </span>
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={5}
                                                    step={0.1}
                                                    value="3"
                                                    name=""
                                                    id=""
                                                    className="range-star"
                                                />
                                                <span>30</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* user review */}
                                {reviewStore?.map((review) => (
                                    <div
                                        key={review._id}
                                        className="border border-gray-100 p-6 rounded-lg mt-6"
                                    >
                                        <div className="mb-3 flex gap-2 ">
                                            {listStar
                                                .map((star, index) => (
                                                    <div key={index}>
                                                        <img
                                                            src={
                                                                star.star_yellow
                                                            }
                                                            alt=""
                                                            className="h-4"
                                                        />
                                                    </div>
                                                ))
                                                .slice(
                                                    0,
                                                    reviewsRedux.rating
                                                        ? reviewsRedux
                                                        : review.rating
                                                )}
                                        </div>

                                        <div key={review._id}>
                                            <div className="flex gap-1 items-center mb-2">
                                                <span className="font-medium flex items-center gap-1.5">
                                                    {reviewsRedux.author
                                                        ? reviewsRedux.author
                                                        : review?.author}
                                                    <img
                                                        src={check_circle}
                                                        alt=""
                                                        className="h-4 -translate-y-[2px]"
                                                    />
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-10">
                                                “{' '}
                                                {reviewsRedux.comment
                                                    ? reviewsRedux.comment
                                                    : review.comment}{' '}
                                                ”
                                            </p>
                                            <div className="text-sm font-medium text-gray-600">
                                                {new Date(
                                                    review.createdAt
                                                ).toLocaleString('vi-VN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* review modal */}
                        {isShowReviewModal && (
                            <ReviewModal
                                isShowReviewModal={isShowReviewModal}
                                setIsShowReviewModal={setIsShowReviewModal}
                                productName={productName}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Product for  you */}
            <div></div>
        </div>
    );
}

export default ContentProductDetail;
