import { useDispatch, useSelector } from 'react-redux';
import DiscountCodeModal from '../modals/DicountCodeModal';
import close_white from '@/assets/svg/close_white.svg';
import discount_code_3 from '@/assets/svg/discount_code_3.svg';
import { ListDiscountCode } from '../common/ListDiscountCode';
import discount_code from '@/assets/svg/discount-code.svg';
import { setDiscountPrice } from '@/redux/cartSlice';
import { useState } from 'react';
function DiscountPaymentCommon() {
    const dispatch = useDispatch();

    const [isShowDiscountModal, setIsShowDiscountModal] = useState(false);

    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const discountCode = useSelector((state) => state.cart.discountCode);
    return (
        <>
            {/* total price and discount code */}
            <div className=" py-2 ">
                <span className="text-sm text-gray-600">
                    Nhập mã giảm giá nếu có
                </span>
                <div
                    className="flex items-center justify-center border rounded-md
                                        w-full mt-3 overflow-hidden"
                >
                    <div className="flex-1">
                        <input
                            type="text"
                            className=" outline-none px-3 text-sm w-full"
                            placeholder="mã giảm giá"
                        />
                    </div>
                    <div className="bg-black w-20 min-w-20 text-white text-sm py-3 text-center">
                        <div className="w-20 min-w-20">Sử dụng</div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setIsShowDiscountModal(true)}
                className=" text-sm mb-3 flex items-center gap-1 cursor-pointer"
            >
                <img src={discount_code} alt="" />
                <span className="text-yellow-base hover:brightness-110">
                    Xem thêm mã giảm giá
                </span>
            </div>

            {ListDiscountCode.map((item, index) => {
                const result = item.code === discountCode && (
                    <div
                        onClick={() => setIsShowDiscountModal(true)}
                        key={index}
                        className=" flex flex-wrap justify-start w-full mb-5 h-8 items-center"
                    >
                        <div
                            className="discount-code relative text-yellow-base text-sm
                                text-center font-semibold cursor-pointer w-[120px] h-full flex
                                "
                        >
                            <span className="border  w-full py-1 border-yellow-base rounded-sm">
                                Giảm {item.price_sale.toLocaleString('VN-vn')}đ
                            </span>
                        </div>
                    </div>
                );
                return result;
            })}

            {/* modal discount code */}
            {isShowDiscountModal && (
                <DiscountCodeModal
                    isShowDiscountModal={isShowDiscountModal}
                    setIsShowDiscountModal={setIsShowDiscountModal}
                />
            )}

            {/*  */}
            <div className=" text-gray-700 py-3">
                <div className="text-sm flex flex-col  gap-2">
                    <div className="flex justify-between">
                        <div>Mã giảm giá</div>
                        {discountCode
                            ? ListDiscountCode.map((item, index) => {
                                  const result = item.code === discountCode && (
                                      <div key={index}>
                                          -{' '}
                                          {item.price_sale.toLocaleString(
                                              'VN-vn'
                                          )}
                                          ₫
                                      </div>
                                  );

                                  return result;
                              })
                            : 0 + '₫'}
                    </div>
                    {ListDiscountCode.map((item, index) => {
                        const result = item.code === discountCode && (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={discount_code_3}
                                    alt=""
                                    className="h-4 translate-y-[1px]"
                                />
                                <div className="text-xs text-yellow-base">
                                    {item.code}
                                </div>
                                <img
                                    onClick={() =>
                                        dispatch(setDiscountPrice(''))
                                    }
                                    src={close_white}
                                    alt=""
                                    className="bg-gray-300 h-4 rounded-full p-[1px] cursor-pointer hover:border"
                                />
                            </div>
                        );
                        return result;
                    })}
                </div>
            </div>

            {/*  */}
            <div className="flex justify-between items-center text-sm ">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
            </div>
            <div className="flex justify-between  py-5">
                <span className="text-lg font-semibold">Tổng cộng</span>
                <span className="font-bold text-lg">
                    {totalProductInCart.toLocaleString('vn-VN')}₫
                </span>
            </div>
        </>
    );
}

export default DiscountPaymentCommon;
