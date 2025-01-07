import close from '@/assets/svg/close.svg';
import cartEmpty from '@/assets/svg/cart-empty.svg';
import recycle from '@/assets/svg/recycle.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem } from '@/redux/cartSlice';
import { motion } from 'framer-motion';
import { useState } from 'react';

function CartAddProductModal({ isOpenModalCart, setIsOpenModalCart }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isCloseModalAnimation, setCloseModalAnimation] = useState(false);

    const closeModal = () => {
        setCloseModalAnimation(true);

        setTimeout(() => {
            setCloseModalAnimation(false);
            setIsOpenModalCart(false);
        }, 300);
    };

    const userId = useSelector((state) => state.auth?.user?.id);
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
    const lengthProductInCart = useSelector(
        (state) => state.cart?.cartItem?.products?.length
    );
    const lengthAllProduct = useSelector((state) =>
        state.cart?.cartItem?.products?.reduce(
            (acc, item) => acc + item.quantity,
            0
        )
    );

    const handleDeleteProduct = (userId, productId) => {
        dispatch(
            deleteCartItem({
                userId,
                productIds: [productId],
            })
        );
    };

    return (
        <div className="fixed z-20 top-0 right-0 left-0 bottom-0 bg-models flex justify-end">
            <motion.div
                initial={{ x: '100%' }}
                animate={{
                    x: isOpenModalCart && !isCloseModalAnimation ? '0' : '100%',
                }}
                transition={{ duration: 0.4 }}
                className="w-96 flex gap-2"
            >
                <div
                    onClick={closeModal}
                    className=" bg-white cursor-pointer rounded-full mt-8 w-8 
                                h-8 flex justify-center items-center"
                >
                    <img src={close} alt="" className="h-5" />
                </div>

                <div className="bg-white flex-1 p-5 h-full overflow-scroll">
                    <div
                        className="flex items-center justify-between border-b 
                            text-sm border-gray-100 py-2"
                    >
                        {cartItems && lengthProductInCart > 0 ? (
                            <h2>Danh sách sản phẩm ({lengthAllProduct})</h2>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    {/* product inner cart */}
                    <div className="flex flex-col justify-between mb-10">
                        {lengthProductInCart > 0 &&
                            cartItems?.products?.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 border-b py-4 border-gray-100"
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt=""
                                        className="h-20"
                                    />
                                    <div className="w-8/12 flex flex-col justify-between">
                                        <h3 className="line-clamp-1">
                                            {product?.nameProduct}
                                        </h3>
                                        <p className="font-bold">
                                            {
                                                quantityProductInCart[
                                                    product.productId
                                                ]
                                            }{' '}
                                            x{' '}
                                            {priceProductInCart[
                                                product.productId
                                            ].toLocaleString('vn-VN')}{' '}
                                            đ
                                        </p>
                                        <p className="text-sm">
                                            Màu sắc:{' '}
                                            {product.colors
                                                ?.map((color) => color)
                                                .join(', ')}
                                        </p>
                                    </div>
                                    <img
                                        src={recycle}
                                        alt=""
                                        className="w-5 cursor-pointer"
                                        onClick={() =>
                                            handleDeleteProduct(
                                                userId,
                                                product?._id
                                            )
                                        }
                                    />
                                </div>
                            ))}
                    </div>

                    {/* cart inner quantity product */}
                    {cartItems && lengthProductInCart > 0 ? (
                        <div className=" mb-5">
                            <div className="flex justify-between mb-10 text-black-base">
                                <span className="">Tổng tiền tạm tính:</span>
                                <span className="font-medium">
                                    {totalProductInCart.toLocaleString('vn-VN')}{' '}
                                    đ
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-3 text-sm">
                                <button
                                    onClick={() => navigate('/your-cart')}
                                    className="w-full rounded-sm text-black-base border px-3 py-2.5 bg-white
                                            border-black-base
                                        hover:text-white hover: hover:bg-black-base transition-colors ease-out
                                        duration-300"
                                >
                                    Xem giỏ hàng
                                </button>
                                <button
                                    onClick={() =>
                                        navigate('/cart/checkout-step-1')
                                    }
                                    className="w-full rounded-sm text-white px-3 py-3 bg-black-base hover:bg-white
                                        hover:border hover:border-black-base hover:text-black-base transition-colors ease-out
                                        duration-300"
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-5 px-3 mb-5">
                            <img
                                src={cartEmpty}
                                alt=""
                                className="h-20 max-xl:h-16"
                            />
                            <h2 className="font-semibold">
                                Giỏ hàng của bạn đang trống
                            </h2>
                            <p className="text-center text-sm">
                                Hiện tại giỏ hàng của bạn đang trống. Hãy trải
                                nghiệm các sản phẩm độc đáo của chúng tôi và
                                thêm chúng vào giỏ hàng.
                            </p>
                            <button
                                onClick={closeModal}
                                className="w-40 rounded-sm text-white px-3 py-3 bg-black-base hover:bg-white
                                        hover:border hover:border-black-base hover:text-black-base transition-colors ease-out
                                        duration-300"
                            >
                                Trở lại Shop
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default CartAddProductModal;
