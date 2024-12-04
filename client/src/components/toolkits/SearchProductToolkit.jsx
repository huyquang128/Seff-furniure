/* eslint-disable react/prop-types */
import { setIdProduct } from '@/redux/cartSlice';
import { getProductSingleByName, recommendProduct } from '@/redux/productSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const listProducts = [
    {
        name: 'sản phẩm 1',
        material: 'gỗ',
        color: 'xanh',
        size: '133x123x123cm',
        price: 19123100,
        src: 'https://res.cloudinary.com/dgm8gio7e/image/upload/v1729255224/bdwhdk8jf2jflioujg71.jpg',
    },
    {
        name: 'sản phẩm 1',
        material: 'gỗ',
        color: 'xanh',
        size: '133x123x123cm',
        price: 19123100,
        src: 'https://res.cloudinary.com/dgm8gio7e/image/upload/v1729255224/bdwhdk8jf2jflioujg71.jpg',
    },
    {
        name: 'sản phẩm 1',
        material: 'gỗ',
        color: 'xanh',
        size: '133x123x123cm',
        price: 19123100,
        src: 'https://res.cloudinary.com/dgm8gio7e/image/upload/v1729255224/bdwhdk8jf2jflioujg71.jpg',
    },
];

function SearchProductToolkit({
    isShowSearchProductsToolkit,
    setIsShowSearchProductsToolkit,
    refElement,
    keywords,
}) {
    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state react

    //state redux
    const productsSearchByKeywords = useSelector(
        (state) => state?.products.productsSearchByKeyword
    );

    //
    const sliceProductsSearchByKeywords =
        productsSearchByKeywords?.length > 0
            ? productsSearchByKeywords?.slice(0, 5)
            : productsSearchByKeywords;

    //handle events
    const handleClickOutside = (event) => {
        if (
            !refElement.contains(event.target) &&
            !ref.current.contains(event.target)
        ) {
            setIsShowSearchProductsToolkit(false);
        }
    };

    const handleRedirectToDetail = (productName, productId) => {
        console.log('🚀 ~ handleRedirectToDetail ~ productId:', productId);

        dispatch(setIdProduct(productId));
        dispatch(recommendProduct(productId));
        dispatch(getProductSingleByName(productName)).then((response) => {
            if (response.data?.success) {
                navigate(`/${productName}`);
            }
        });
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div
            ref={ref}
            className="absolute z-20 cursor-pointer bg-white w-9/12 max-lg:w-11/12 
                        max-md:w-9/12 max-md:left-8 max-md:top-6 max-sm:w-10/12 left-0 translate-y-5 shadow-model-1 rounded-lg px-4
                         "
        >
            {keywords && (
                <div className="border-b border-gray-100 py-3">
                    <div className="text-sm font-medium  ">
                        Lịch sử tìm kiếm
                    </div>
                </div>
            )}

            <div className="flex justify-between text-sm py-4">
                <div className=" font-medium ">Sản phẩm liên quan</div>
                <div className="underline text-red-800 hover:brightness-110">
                    Xem thêm
                </div>
            </div>

            {productsSearchByKeywords?.length <= 0 && (
                <div className="text-center mb-5 text-xs">
                    Không có kết quả tìm kiếm{' '}
                </div>
            )}

            {/* list products */}
            <div className="flex flex-col">
                {sliceProductsSearchByKeywords ? (
                    sliceProductsSearchByKeywords.map((product) => (
                        <Link key={product._id} to={`/${product.name}`}>
                            <div
                                key={product._id}
                                onClick={() =>
                                    handleRedirectToDetail(
                                        product.name,
                                        product._id
                                    )
                                }
                                className="flex gap-2 py-3"
                            >
                                <img
                                    src={product.colors[0].images[0]}
                                    alt=""
                                    className="h-20 rounded-md"
                                />
                                <div className="flex flex-col gap-2">
                                    <div className="font-medium">
                                        {product.name}
                                    </div>
                                    <div className="flex text-xs text-text-gray gap-1 items-center flex-wrap">
                                        <div className="">
                                            {product.material}
                                        </div>
                                        <div className="w-[1px] h-3.5 bg-gray-400"></div>
                                        <div className="">
                                            {product.colors
                                                .map((color) => color.colorId)
                                                .join(', ')}
                                        </div>
                                        <div className="w-[1px] h-3.5 bg-gray-400"></div>
                                        <div>
                                            {product.size.width}x
                                            {product.size.height}x
                                            {product.size.length}centimetre
                                        </div>
                                    </div>
                                    <div className="text-red-700 text-sm font-medium">
                                        {product.price.toLocaleString('VN-vn')}đ
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-center mb-5 text-xs">
                        Không có kết quả tìm kiếm{' '}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchProductToolkit;
