/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState } from 'react';

import heart from '@/assets/svg/heart.svg';
import heart_red from '@/assets/svg/heart_red.svg';
import star from '@/assets/svg/star.svg';
import star_yellow from '@/assets/svg/star_yellow.svg';
import ActiveImgTooltip from '../toolkits/ActiveImgTooltip';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteProduct, setProductFavoriteActive } from '@/redux/favorite';

function LayoutProduct({ item }) {
    const dispatch = useDispatch();

    const productFavoriteActive = useSelector(
        (state) => state?.favoriteProducts?.productFavoriteActive
    );
    const userId = useSelector((state) => state?.auth?.user?.id);

    //state react
    const [urlImgActive, setUrlImgActive] = useState(null);
    const [urlImgHover, setUrlImgHover] = useState(null);
    const [productIdActive, setProductIdActive] = useState(null);
    const [colorIdActive, setColorIdActive] = useState(null);
    const [productIdActiveModal, setProductIdActiveModal] = useState(null);

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

    const handleClickAddProductFavorite = (id) => {
        dispatch(setProductFavoriteActive(id));
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', id);

        dispatch(addFavoriteProduct(formData));
    };

    return (
        <div>
            <Link to={`${item.name}`}>
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
                <div className="font-semibold mx-2 mb-1 hover:underline">
                    {item.name}
                </div>
            </Link>
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
                <div
                    onClick={() => handleClickAddProductFavorite(item._id)}
                    className={`mx-2 ${
                        productFavoriteActive.includes(item._id)
                            ? 'bg-red-100'
                            : 'bg-bg-slider'
                    } r p-2 rounded-full cursor-pointer`}
                >
                    <img
                        src={
                            productFavoriteActive.includes(item._id)
                                ? heart_red
                                : heart
                        }
                        alt=""
                        className="h-4"
                    />
                </div>
            </div>
        </div>
    );
}

export default LayoutProduct;
