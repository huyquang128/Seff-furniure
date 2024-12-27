/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import bed4 from '@/assets/image/bed-4.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretLeft,
    faCaretRight,
    faChevronRight,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import sort from '@/assets/svg/sort.svg';
import filter from '@/assets/svg/filter.svg';
import arr_down from '@/assets/svg/arr-down.svg';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import FilterModals from '../modals/filterModals';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch } from 'react-redux';
import { getProductSingleByName } from '@/redux/productSlice';
import { setIdProduct } from '@/redux/cartSlice';

import LayoutProduct from '../common/layoutProductList';

const actionBtnFilter = [
    { title: 'Sắp xếp', icon: sort },
    { title: 'Màu sắc', icon: arr_down },
    { title: ' Giá', icon: arr_down },
    { title: '  Bộ lọc', icon: filter },
];

const filterColors = [
    { id: 'blue', name: 'Xanh dương', codeColor: '#0000FF' },
    { id: 'green', name: 'Xanh lá', codeColor: '#008000' },
    { id: 'orange', name: 'Cam', codeColor: '#FFA500' },
    { id: 'pink', name: 'Hồng', codeColor: '#FFC0CB' },
    { id: 'gray', name: 'Xám', codeColor: '#808080' },
    { id: 'white', name: 'Trắng', codeColor: '#FFFFFF' },

    { id: 'red', name: 'Đỏ', codeColor: '#FF0000' },
    { id: 'black', name: 'Đen', codeColor: '#000000' },
    { id: 'brown', name: 'Nâu', codeColor: '#A52A2A' },
    { id: 'purple', name: 'Tím', codeColor: '#800080' },
    { id: 'yellow', name: 'Vàng', codeColor: '#FFFF00' },
    { id: 'be', name: 'Be', codeColor: '#F5F5DC' },
];

const filterSort = [
    { name: 'Sản phẩm mới', type: 'productNew' },
    { name: 'Sản phẩm bán chạy', type: 'bestSelling' },
    { name: 'Theo giá Cao tới Thấp', type: 'desc' },
    { name: 'Theo giá Thấp tới Cao', type: 'asc' },
];

function RoomProduct({ menuAndProduct, type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let menuAndProducts;
    if (type == 'children') {
        menuAndProducts = menuAndProduct?.subChildren;
    } else {
        menuAndProducts = menuAndProduct?.children;
    }

    //state react
    const [showMore, setShowMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenSortBtn, setIsOpenSortBtn] = useState(false);
    const [btnId, setBtnId] = useState(null);
    const [colorIds, setColorIds] = useState(
        JSON.parse(localStorage.getItem('COLORS')) || []
    );
    const [sortType, setSortType] = useState('');
    const [productFiltered, setProductFiltered] = useState([]);
    const refToolkit = useRef([]);
    const [valueRangePrice, setValueRangePrice] = useState([39000, 25247000]);
    const [displayValues, setDisplayValues] = useState([
        valueRangePrice[0].toLocaleString('vn-VN') + ' đ',
        valueRangePrice[1].toLocaleString('vn-VN') + ' đ',
    ]);

    // chia đôi mảng
    const haftLengthRoomProducts = Math.ceil(
        productFiltered?.length < 8
            ? productFiltered?.length
            : productFiltered?.length / 2
    );

    useEffect(() => {
        localStorage.setItem('COLORS', JSON.stringify(colorIds));
    }, [colorIds]);

    const visibleProduct = showMore
        ? productFiltered
        : productFiltered?.slice(0, haftLengthRoomProducts);

    useEffect(() => {
        let filterProductColor;
        if (menuAndProduct?.products) {
            filterProductColor = [...menuAndProduct.products];
        }

        if (colorIds.length > 0) {
            filterProductColor = filterProductColor?.filter((product) => {
                return product.colors.some((color) =>
                    colorIds.includes(color.colorId)
                );
            });
        }

        if (sortType === 'asc') {
            filterProductColor = filterProductColor?.sort((a, b) => {
                return a.price - b.price;
            });
        } else if (sortType === 'desc') {
            filterProductColor = filterProductColor?.sort((a, b) => {
                return b.price - a.price;
            });
        }

        if (filterProductColor?.length > 0) {
            filterProductColor = filterProductColor.filter(
                (product) =>
                    product.price >= valueRangePrice[0] &&
                    product.price <= valueRangePrice[1]
            );
        }

        setProductFiltered(
            filterProductColor?.length > 0
                ? filterProductColor
                : menuAndProduct?.products
        );
    }, [colorIds, menuAndProduct?.products, sortType, valueRangePrice]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowMoreContent = () => {
        setIsLoading(true);
        setTimeout(() => {
            setShowMore(true);
            setIsLoading(false);
        }, 1500);
    };

    const handleShortContent = () => {
        setIsLoading(true);
        setTimeout(() => {
            setShowMore(false);
            setIsLoading(false);
        }, 500);
    };

    // sort
    const handleSort = (type) => {
        setSortType(type);
    };

    // filter color
    const handleFilter = (id) => {
        setBtnId(id);
        setIsOpenSortBtn(!isOpenSortBtn);
    };

    const handleClickColors = (id) => {
        setColorIds((prev) => {
            return prev.includes(id)
                ? prev.filter((color) => color !== id)
                : [...prev, id];
        });
        localStorage.setItem('COLORS', JSON.stringify(colorIds));
    };

    const handleClickOutside = (event) => {
        if (
            !refToolkit.current.some(
                (toolkit) => toolkit && toolkit.contains(event.target)
            )
        )
            setBtnId(null);
    };

    // range - input price
    const handleRangeChange = (value) => {
        setValueRangePrice(value);
        let newDisplayValues = [...displayValues];
        const newResultDisplayValue = newDisplayValues.map((item, index) => {
            return (item = value[index].toLocaleString('vn-VN')) + ' đ';
        });

        setDisplayValues(newResultDisplayValue);
    };

    const handleInputChange = (index, value) => {
        const cleanValue = value.replace(/[^0-9]/g, '');
        const numberValue = Number(cleanValue);

        if (!isNaN(numberValue)) {
            const newValueRangePrice = [...valueRangePrice];
            newValueRangePrice[index] = numberValue;
            setValueRangePrice(newValueRangePrice);

            const newDisplayValues = [...displayValues];
            newDisplayValues[index] = numberValue.toLocaleString('vn-VN');
            setDisplayValues(newDisplayValues);
        }
    };

    const handleBlurInputPrice = (index) => {
        const newDisplayValues = [...displayValues];
        newDisplayValues[index] = `${newDisplayValues[index]} đ`;
        setDisplayValues(newDisplayValues);
    };

    const handleFocusInputPrice = (index) => {
        const newDisplayValues = [...displayValues];
        newDisplayValues[index] = newDisplayValues[index].replace(' đ', ' ');
        setDisplayValues(newDisplayValues);
    };

    // reset filter selected
    const resetFilterSelected = () => {
        setSortType('');
        setColorIds([]);
        setValueRangePrice([39000, 25247000]);
        setBtnId(null);
    };

    //redirect to product detail
    const handleClickProductDetail = (productName, id) => {
        dispatch(setIdProduct(id));

        dispatch(getProductSingleByName(productName)).then((response) => {
            if (response.data?.success) {
                navigate(`/${productName}`);
            }
        });
    };

    return (
        <div>
            <div className="mb-10">
                <Swiper
                    className="w-full max-sm:py-0 max-sm:text-xs rounded-xl"
                    breakpoints={{
                        375: {
                            slidesPerView: 2.3,
                            spaceBetween: 10,
                        },
                        425: {
                            slidesPerView: 2.5,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2.8,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}
                    spaceBetween={20}
                    navigation={{
                        nextEl: '.swiper-button-next-2',
                        prevEl: '.swiper-button-prev-2',
                    }}
                    modules={[Navigation]}
                >
                    {menuAndProducts?.map((item) => (
                        <SwiperSlide
                            key={item._id}
                            className=" py-1.5 pt-3 max-md:px-2   bg-bg-slider rounded-lg cursor-pointer"
                        >
                            <Link className="flex flex-col gap-2 items-center ">
                                <img
                                    src={item.products[0]?.colors[0]?.images[0]}
                                    alt=""
                                    className=" w-[180px] h-[124px] max-md:w-[260px]  max-md:h-[180px] max-sm:h-[100px] 
                                            max-sm:w-[140px] max-lg:min-w-32 
                                            rounded-md"
                                />
                                <span className="font-medium text-sm text-bg-text ">
                                    {item.title}
                                </span>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-prev-2 max-lg:top-[70%] max-lg:-left-3 max-md:hidden">
                    <FontAwesomeIcon
                        icon={faCaretLeft}
                        className="text-gray-500 bg-white px-3.5 py-2.5 rounded-full shadow-btn-slider"
                    />
                </div>
                <div className="swiper-button-next-2 max-lg:top-[70%] max-lg:-right-3 max-md:hidden">
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-gray-500 bg-white px-3.5 py-2.5 rounded-full shadow-btn-slider"
                    />
                </div>
            </div>

            {/* action filter */}
            <div
                className="flex items-center justify-between mb-5 max-md:grid 
                            max-md:grid-cols-1"
            >
                <div className="flex gap-5 max-md:mb-8 relative">
                    {actionBtnFilter.map((btn, index) => (
                        <button
                            key={index}
                            onClick={() => handleFilter(index)}
                            className={`max-md:w-6/12 flex items-center ${
                                index === 1 || index === 2
                                    ? 'max-md:hidden'
                                    : ''
                            } 
                                        justify-between text-sm gap-2 bg-bg-slider 
                                        px-5 rounded-md font-medium py-2.5`}
                        >
                            {btn.title}
                            <img src={btn.icon} alt="" className="h-4" />
                        </button>
                    ))}

                    {/* toolkit */}
                    {btnId === 0 && (
                        <div
                            className="absolute shadow-model-1 cursor-pointer
                             bg-white top-12 p-5 border flex flex-col  rounded-lg
                             text-black-second text-sm gap-5"
                            ref={(el) => (refToolkit.current[0] = el)}
                        >
                            {filterSort.map((item, index) => (
                                <span
                                    onClick={() => handleSort(item.type)}
                                    key={index}
                                    className="hover:underline "
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {btnId === 1 && (
                        <div
                            ref={(el) => (refToolkit.current[1] = el)}
                            className="absolute shadow-model-1 cursor-pointer 
                                    bg-white top-12 left-[28%] p-5 grid grid-cols-4 
                                    gap-3 border rounded-lg text-black-second text-sm"
                        >
                            {filterColors.map((color, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-sm shadow-home-product ${
                                            colorIds.includes(color.id)
                                                ? 'scale-105 border-2 border-teal-300'
                                                : 'scale-100 border-none'
                                        } transition-transform duration-300`}
                                        style={{
                                            backgroundColor: color.codeColor,
                                        }}
                                        onClick={() =>
                                            handleClickColors(color.id)
                                        }
                                    ></div>
                                );
                            })}
                        </div>
                    )}
                    {btnId === 2 && (
                        <div
                            ref={(el) => (refToolkit.current[2] = el)}
                            className="absolute w-96 shadow-model-1 overflow-hidden 
                                    cursor-pointer bg-white top-12 left-[50%] 
                                    p-5 flex flex-col gap-3 border rounded-lg 
                                    text-black-second text-sm"
                        >
                            <div className="flex justify-between gap-3 w-full">
                                <input
                                    type="text"
                                    className=" bg-bg-slider rounded-lg outline-none px-5 py-3 w-6/12"
                                    value={displayValues[0]}
                                    onChange={(e) =>
                                        handleInputChange(0, e.target.value)
                                    }
                                    onFocus={() => handleFocusInputPrice(0)}
                                    onBlur={() => handleBlurInputPrice(0)}
                                />
                                <input
                                    type="text"
                                    className=" bg-bg-slider rounded-lg outline-none px-5 py-3 w-6/12"
                                    value={displayValues[1]}
                                    onChange={(e) =>
                                        handleInputChange(1, e.target.value)
                                    }
                                    onFocus={() => handleFocusInputPrice(1)}
                                    onBlur={() => handleBlurInputPrice(1)}
                                />
                            </div>
                            <div>
                                <Slider
                                    range
                                    min={39000}
                                    max={25247000}
                                    value={valueRangePrice}
                                    onChange={handleRangeChange}
                                    allowCross={false} // Đảm bảo 2 đầu không bị chồng lên nhau
                                />
                            </div>
                        </div>
                    )}
                </div>
                <span className="text-sm font-medium">
                    {productFiltered?.length > 0
                        ? productFiltered?.length
                        : menuAndProduct?.products?.length}{' '}
                    sản phẩm
                </span>
            </div>

            {/* model filter */}
            {btnId === 3 && (
                <FilterModals
                    filterSort={filterSort}
                    filterColors={filterColors}
                    ref={refToolkit}
                    setBtnId={setBtnId}
                    handleSort={handleSort}
                    handleClickColors={handleClickColors}
                    valueRangePrice={valueRangePrice}
                    handleRangeChange={handleRangeChange}
                    handleInputChange={handleInputChange}
                    handleFocusInputPrice={handleFocusInputPrice}
                    handleBlurInputPrice={handleBlurInputPrice}
                    displayValues={displayValues}
                    colorIds={colorIds}
                    sortType={sortType}
                    resetFilterSelected={resetFilterSelected}
                    btnId={btnId}
                />
            )}

            {colorIds.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                    <div className="flex gap-3 flex-wrap ">
                        {colorIds.map((color, index) => (
                            <div
                                key={index}
                                className="px-7 py-1.5 border text-sm bg-bg-slider rounded-sm"
                            >
                                {color}
                            </div>
                        ))}
                    </div>
                    <div
                        onClick={resetFilterSelected}
                        className="px-7 bg-black-base text-white py-1.5 text-sm rounded-sm"
                    >
                        Xóa tất cả
                    </div>
                </div>
            )}

            {/* product */}
            <div>
                <div
                    className="overflow-hidden grid grid-cols-4 max-lg:gap-4 
                                max-lg:grid-cols-3 max-sm:grid-cols-2 gap-8 
                                justify-between py-4 mb-10"
                >
                    {visibleProduct?.map((item, index) => (
                        <div
                            onClick={() =>
                                handleClickProductDetail(item.name, item._id)
                            }
                            key={index}
                            className="shadow-home-product rounded-md "
                        >
                            <LayoutProduct item={item} />
                        </div>
                    ))}
                </div>

                {/* loading && show more product */}
                <div className="flex items-center justify-center ">
                    {isLoading && (
                        <div className="mb-10 flex items-center">
                            <RotatingLines
                                visible={true}
                                height="20"
                                width="20"
                                color="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            {showMore ? null : (
                                <span className="text-sm text-bg-text italic">
                                    Tải sản phẩm...
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center">
                    {showMore && (
                        <button
                            onClick={handleShortContent}
                            className="flex items-center justify-center gap-5 px-7 
                                        py-3.5 text-sm font-medium text-black  
                                        rounded-full border border-black hover:text-white
                                         hover:bg-black transition-all ease-linear"
                        >
                            <span className="w-16">Thu Gọn</span>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </button>
                    )}
                    {showMore === false && productFiltered?.length > 8 && (
                        <button
                            onClick={handleShowMoreContent}
                            className="flex items-center justify-center gap-5 px-7 
                                        py-3.5 text-sm font-medium text-black  rounded-full 
                                        border border-black hover:text-white 
                                        hover:bg-black transition-all ease-linear"
                        >
                            Xem thêm
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomProduct;
