import {
    faFileInvoiceDollar,
    faMinus,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import recycle from '@/assets/svg/recycle.svg';
import CartModels from '../modals/PaymentCartModals';
import { useDispatch, useSelector } from 'react-redux';
import {
    decreaseQuantityInCart,
    deleteCartItem,
    getCartItems,
    increaseQuantityInCart,
    inputQuantityAndTotalPrice,
    setDiscountPrice,
    updateCartItemQuantityAndTotalPrice,
    updateQuantity,
} from '@/redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import cartEmpty from '@/assets/svg/cart-empty.svg';
import ConfirmRemoveCartProductModal from '../modals/ConfirmRemoveCartProductModal';
import discount_code from '@/assets/svg/discount-code.svg';
import discount_code_3 from '@/assets/svg/discount_code_3.svg';
import DiscountCodeModal from '../modals/DicountCodeModal';
import PaymentCartModals from '../modals/PaymentCartModals';
import close_white from '@/assets/svg/close_white.svg';
import { ListDiscountCode } from '../common/ListDiscountCode';

function ContentCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpenModalsPayment, setIsOpenModalsPayment] = useState(false);
    const [productId, setProductId] = useState(null);
    const [isOpenConfirmProductCartModal, setIsOpenConfirmProductCartModal] =
        useState(false);
    const [isShowDiscountModal, setIsShowDiscountModal] = useState(false);

    //state redux
    const cartItems = useSelector((state) => state.cart?.cartItem);
    const quantityProductInCart = useSelector(
        (state) => state.cart?.quantityProductInCart
    );
    const priceProductInCart = useSelector(
        (state) => state.cart?.priceProductInCart
    );

    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );

    const userId = useSelector((state) => state.auth?.user?.id);
    const lengthProductInCart = useSelector(
        (state) => state.cart?.cartItem?.products?.length
    );
    // deliveryFee
    const discountCode = useSelector((state) => state.cart.discountCode);
    const deliveryFee = useSelector((state) => state.cart.deliveryFee);

    //hook
    useEffect(() => {
        if (userId) {
            dispatch(getCartItems(userId));
        }
    }, [lengthProductInCart]);

    useEffect(() => {
        if (productId) {
            if (userId) {
                const formData = {
                    userId,
                    productId,
                    quantity: quantityProductInCart[productId],
                    priceProductInCart: priceProductInCart[productId],
                };
                dispatch(updateCartItemQuantityAndTotalPrice(formData));
            }
        }
    }, [productId, totalProductInCart]);

    //handle events
    const handleIncreaseQuantityProduct = ({ productId, price }) => {
        dispatch(increaseQuantityInCart({ productId, price }));
        setProductId(productId);
    };

    const handleDecreaseQuantityProduct = ({ productId, price }) => {
        dispatch(decreaseQuantityInCart({ productId, price }));
        setProductId(productId);
    };

    const handleChangeInputQuantityProduct = (e, productId, price) => {
        dispatch(
            inputQuantityAndTotalPrice({
                value: e.target.value,
                productId,
                price,
            })
        );
    };

    const handleDeleteProduct = () => {
        setIsOpenConfirmProductCartModal(true);
    };

    return (
        <div
            className="max-w-[1440px] mx-auto max-xl:px-[68px] mb-10 
                            max-lg:px-3 mt-[200px] "
        >
            <div
                className="flex justify-between items-center mb-4 max-md:mb-0 max-md:fixed 
                                max-md:z-[15] max-md:bg-white max-md:right-0
                                max-md:left-0 max-md:top-0 max-md:py-5 max-md:px-3
                                max-md:mt-[106px] max-sm:mt-[100px] 
                                "
            >
                <h2 className="text-xl font-bold ">Giỏ hàng của bạn</h2>
                <div className="md:hidden sm:block font-semibold">
                    <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        className="mr-1"
                    />
                    <span onClick={() => setIsOpenModalsPayment(true)}>
                        Thanh toán
                    </span>
                </div>
            </div>

            <div
                className={`grid grid-cols-7 ${
                    lengthProductInCart > 0 ? 'grid-rows-2' : ''
                } gap-3 max-h-[500px] 
                            max-md:max-h-none`}
            >
                {lengthProductInCart > 0 ? (
                    <div className="col-span-5 row-span-2 max-md:col-span-7 max-md:z-10 ">
                        <ul className="grid grid-cols-12 border-b border-gray-100">
                            <li className="col-span-5 font-medium py-3 border-gray-100">
                                Sản phẩm
                            </li>
                            <li className=" max-md:hidden col-span-2 font-medium py-3 border-gray-100">
                                Giá
                            </li>
                            <li
                                className=" max-md:hidden col-span-2 font-medium max-lg:ml-0 max-lg:text-center  
                                        ml-9 py-3 border-gray-100 max-md:text-start"
                            >
                                Số lượng
                            </li>
                            <li
                                className=" max-md:hidden col-span-2 font-medium text-center py-3 border-gray-100
                                        max-lg:ml-0 max-lg:text-start"
                            >
                                Tạm tính
                            </li>
                        </ul>

                        {/* product */}
                        <ul className=" border-b border-gray-100  flex flex-col max-h-[450px] max-md:max-h-none overflow-y-scroll">
                            {cartItems?.products?.map((product) => (
                                <li
                                    key={product._id}
                                    className="grid grid-cols-12 border-b border-gray-100 py-3 pr-2 max-md:gap-y-3 "
                                >
                                    <div
                                        className="col-span-5 max-md:col-span-7 max-sm:col-span-8 grid grid-cols-4 
                                                    max-lg:grid-cols-6 max-md:grid-cols-11"
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt="Product"
                                            className="h-24 object-cover rounded-md  col-span-1
                                                    max-lg:col-span-2 max-md:col-span-3 max-sm:col-span-4"
                                        />
                                        <div
                                            className="flex flex-col justify-center gap-3 col-span-2 ml-2
                                                    max-lg:col-span-4 max-md:col-span-8 max-sm:col-span-7"
                                        >
                                            <p className="font-medium ">
                                                {product.nameProduct}
                                            </p>
                                            <p className="text-sm">
                                                Màu sắc:{' '}
                                                {product.colors
                                                    ?.map((color) => color)
                                                    .join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className=" col-start-6 col-span-2 flex items-center max-md:hidden
                                             row-start-1
                            "
                                    >
                                        {product?.price.toLocaleString('vn-VN')}
                                        ₫
                                    </span>
                                    <div
                                        className="rounded-lg col-start-8 col-span-2 row-start-1 
                                             max-md:col-start-3 max-md:row-start-2 max-md:col-span-5
                                            flex flex-col items-center justify-center max-md:items-start
                                            max-sm:col-start-4 "
                                    >
                                        {/* action increase or decrease quantity product */}
                                        <div
                                            className="border border-gray-300 max-md:w-40 rounded-lg items-center h-10 w-10/12 
                                                max-lg:w-11/12 max-mx:px-1 flex justify-center"
                                        >
                                            {quantityProductInCart[
                                                product.productId
                                            ] > 1 && (
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    onClick={() =>
                                                        handleDecreaseQuantityProduct(
                                                            {
                                                                productId:
                                                                    product.productId,
                                                                price: product.price,
                                                            }
                                                        )
                                                    }
                                                />
                                            )}
                                            <input
                                                type="number"
                                                className="number-quantity outline-none w-7/12 text-center px-3 min-w-16"
                                                placeholder="0"
                                                value={
                                                    quantityProductInCart[
                                                        product.productId
                                                    ] < 1
                                                        ? 1
                                                        : quantityProductInCart[
                                                              product.productId
                                                          ]
                                                }
                                                onChange={(e) =>
                                                    handleChangeInputQuantityProduct(
                                                        e,
                                                        product.productId,
                                                        product.price
                                                    )
                                                }
                                            />
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                onClick={() =>
                                                    handleIncreaseQuantityProduct(
                                                        {
                                                            productId:
                                                                product.productId,
                                                            price: product.price,
                                                        }
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <p
                                        className="min-w-28 col-start-10 col-span-2 max-md:col-span-5
                                            flex items-center justify-center max-md:justify-end max-sm:col-span-4
                                            "
                                    >
                                        {priceProductInCart[
                                            product.productId
                                        ].toLocaleString('vn-VN')}
                                        ₫
                                    </p>
                                    <div
                                        className="flex items-center max-md:row-start-2 
                                                    col-start-12 justify-center"
                                    >
                                        <img
                                            onClick={handleDeleteProduct}
                                            src={recycle}
                                            alt=""
                                            className="w-5 cursor-pointer "
                                        />
                                    </div>

                                    {/* modal confirm remove product cart */}
                                    {isOpenConfirmProductCartModal && (
                                        <ConfirmRemoveCartProductModal
                                            isOpenConfirmProductCartModal={
                                                isOpenConfirmProductCartModal
                                            }
                                            setIsOpenConfirmProductCartModal={
                                                setIsOpenConfirmProductCartModal
                                            }
                                            productName={product.nameProduct}
                                            productImg={product.imageUrl}
                                            userId={userId}
                                            productId={product._id}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="col-span-full flex flex-col justify-center items-center gap-5 px-3 mb-5">
                        <img src={cartEmpty} alt="" className="h-32" />
                        <h2 className="font-semibold">
                            Giỏ hàng của bạn đang trống
                        </h2>
                        <p className="text-center text-sm">
                            Hiện tại giỏ hàng của bạn đang trống. Hãy trải
                            nghiệm các sản phẩm độc đáo của chúng tôi và thêm
                            chúng vào giỏ hàng.
                        </p>
                    </div>
                )}

                {/* payment cart */}
                {lengthProductInCart > 0 && (
                    <div className="max-md:hidden col-span-2 row-span-2 max-md:z-10 rounded-md border ">
                        <div className="flex justify-between py-3 px-4 items-center">
                            <h3 className="font-semibold ">Tạm tính</h3>
                            <span className="font-bold text-lg">
                                {totalProductInCart.toLocaleString('vn-VN')}₫
                            </span>
                        </div>
                        <div className="px-4 py-2 ">
                            <span className="text-sm text-gray-600">
                                Nhập mã giảm giá nếu có
                            </span>
                            <div className="flex items-center justify-center border rounded-md overflow-hidden mt-3">
                                <input
                                    type="text"
                                    className="flex-1 outline-none px-3 text-sm"
                                    placeholder="mã giảm giá"
                                />
                                <span className="bg-black text-white text-sm py-3 px-3">
                                    Sử dụng
                                </span>
                            </div>
                        </div>

                        <div
                            onClick={() => setIsShowDiscountModal(true)}
                            className="px-4 text-sm mb-3 flex items-center gap-1 cursor-pointer"
                        >
                            <img src={discount_code} alt="" />
                            <span className="text-yellow-base hover:brightness-110">
                                Xem thêm mã giảm giá
                            </span>
                        </div>

                        {ListDiscountCode.map((item, index) => {
                            const result = item.code === discountCode && (
                                <div
                                    key={index}
                                    className="px-5 flex flex-wrap justify-start w-full mb-5 h-8 items-center"
                                >
                                    <div
                                        className="discount-code relative text-yellow-base text-sm  
                            text-center font-semibold cursor-pointer w-[120px] h-full flex
                            "
                                    >
                                        <span className="border  w-full py-1 border-yellow-base rounded-sm">
                                            Giảm{' '}
                                            {item.price_sale.toLocaleString(
                                                'VN-vn'
                                            )}
                                            đ
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

                        <div className="flex justify-between items-center px-4 text-gray-700 py-3">
                            <div className="text-sm flex flex-col  gap-2">
                                <span>Mã giảm giá</span>
                                {ListDiscountCode.map((item, index) => {
                                    const result = item.code ===
                                        discountCode && (
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
                                                    dispatch(
                                                        setDiscountPrice('')
                                                    )
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

                            {discountCode
                                ? ListDiscountCode.map((item, index) => {
                                      const result = item.code ===
                                          discountCode && (
                                          <span key={index}>
                                              -{' '}
                                              {item.price_sale.toLocaleString(
                                                  'VN-vn'
                                              )}
                                              ₫
                                          </span>
                                      );

                                      return result;
                                  })
                                : 0 + '₫'}
                        </div>
                        <div className="flex justify-between items-center text-sm px-4">
                            <span>Phí vận chuyển</span>
                            <span>Miễn phí</span>
                        </div>
                        <div className="flex justify-between px-3 py-5">
                            <span className="text-lg font-semibold">
                                Tổng cộng
                            </span>
                            <span className="font-bold text-lg">
                                {totalProductInCart.toLocaleString('vn-VN')}₫
                            </span>
                        </div>
                        <div className="mx-4">
                            <button
                                onClick={() =>
                                    navigate('/cart/checkout-step-1')
                                }
                                className="bg-black text-white w-full mb-4 px-7 hover:brightness-150 py-3 rounded-md "
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                )}

                {/* payment modals */}
                {isOpenModalsPayment && (
                    <PaymentCartModals
                        isOpenModalsPayment={isOpenModalsPayment}
                        setIsOpenModalsPayment={setIsOpenModalsPayment}
                        isShowDiscountModal={isShowDiscountModal}
                        setIsShowDiscountModal={setIsShowDiscountModal}
                    />
                )}
            </div>
        </div>
    );
}

export default ContentCart;
