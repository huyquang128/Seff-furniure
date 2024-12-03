import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import StarTooltip from '../toolkits/StarTooltip';
import star_end from '@/assets/svg/star_end.svg';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listStar } from '../common/ListStar';
import {
    getReviewsByProductId,
    postReview,
    setAuthor,
    setStarEvaluated,
    setValueComment,
} from '@/redux/reviewSlice';

function ReviewModal({ isShowReviewModal, setIsShowReviewModal, productName }) {
    const dispatch = useDispatch();

    //state react
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);
    const [isStarTooltip, setStarTooltip] = useState(null);
    const [isReviewed, setIsReviewed] = useState(false);

    //state redux
    const productsRedux = useSelector((state) => state?.review);
    const productId = useSelector(
        (state) => state?.products?.singleProductDetail._id
    );
    const userId = useSelector((state) => state?.auth.user?.id);

    //handle events
    const handleCloseModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsShowReviewModal(false);
        }, 300);
    };

    const handleHoverStar = (id) => {
        setStarTooltip(id);
    };

    const handleHoverOutsize = () => {
        setStarTooltip(null);
    };

    const handleClickStar = (index) => {
        dispatch(setStarEvaluated(index));
    };

    const handleSubmit = () => {
        setIsReviewed(true);

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', productId);
        formData.append('comment', productsRedux.comment);
        formData.append('rating', productsRedux.rating);
        formData.append('author', productsRedux.author);

        dispatch(postReview(formData));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: isShowReviewModal && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-20"
        >
            <motion.div className="bg-white w-4/12 max-md:w-8/12 max-sm:w-11/12 px-10 py-10 rounded-md ">
                {isReviewed ? (
                    <div className="flex flex-col items-center gap-7 text-sm">
                        <img src={star_end} alt="" className="h-24" />
                        <div className="text-xl text-center">
                            Cảm ơn bạn đã gửi đánh giá của bạn!
                        </div>
                        <div
                            onClick={handleCloseModal}
                            className="bg-black-second text-white py-3 w-full 
                                        text-center rounded-3xl cursor-pointer hover:brightness-150"
                        >
                            Tiếp tục mua sắm
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 text-center">
                        <h1 className="font-medium text-lg mb-4 ">
                            Đánh giá về sản phẩm{' '}
                            <span className="text-yellow-base">
                                {productName}
                            </span>
                        </h1>
                        <div className="text-sm mb-4">
                            Bạn đánh có hài lòng về sản phẩm?
                        </div>
                        <div className="flex gap-5 justify-center mb-10">
                            {listStar.map((star, index) => (
                                <motion.div
                                    transition={{ duration: 0.3 }}
                                    onMouseEnter={() => handleHoverStar(index)}
                                    onMouseLeave={handleHoverOutsize}
                                    key={index}
                                    className="relative cursor-pointer"
                                >
                                    <img
                                        onClick={() => handleClickStar(index)}
                                        src={
                                            productsRedux.starArrEvaluated.includes(
                                                index
                                            )
                                                ? star.star_yellow
                                                : star.star
                                        }
                                        alt=""
                                    />
                                    {isStarTooltip === index && (
                                        <StarTooltip
                                            descriptionStar={star.description}
                                            emoji={star.emoji}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                        <div className="">
                            <textarea
                                className="bg-gray-100 w-full text-sm focus:outline focus:outline-2 h-40 rounded-lg p-4 
                                        focus:outline-gray-200 placeholder:text-gray-400 placeholder:italic
                                         placeholder:text-sm mb-10"
                                placeholder="Viết đánh giá..."
                                value={productsRedux.comment || ''}
                                onChange={(e) =>
                                    dispatch(setValueComment(e.target.value))
                                }
                            ></textarea>
                            <label htmlFor="" className="text-sm">
                                <div className="text-start mb-2">
                                    Tên đầy đủ
                                </div>
                                <input
                                    type="text"
                                    className="outline outline-gray-200 outline-1 w-full text-sm focus:outline focus:outline-2  rounded-lg p-2 
                                        focus:outline-gray-200 placeholder:text-gray-400 placeholder:italic
                                         placeholder:text-sm mb-10"
                                    value={productsRedux.author || ''}
                                    onChange={(e) =>
                                        dispatch(setAuthor(e.target.value))
                                    }
                                />
                            </label>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-black-second text-white py-3.5 
                                            rounded-3xl text-sm hover:brightness-150"
                            >
                                Đánh giá
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default ReviewModal;
