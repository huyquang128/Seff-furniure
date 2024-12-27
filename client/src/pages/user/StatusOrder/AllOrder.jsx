import { useDispatch, useSelector } from 'react-redux';
import warning from '@/assets/svg/warning.svg';
import { getAllOrder, removeOrder } from '@/redux/orderSlice';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ConfirmRemoveOrder from '@/components/modals/ConfirmRemoveOrder';

function AllOrder() {
    const dispatch = useDispatch();

    //
    const [isShowDetailOrder, setIsShowDetailOrder] = useState(null);
    const [isAnimation, setIsAnimation] = useState(false);
    const [isShowModalConfirmRemoveOrder, setIsShowModalConfirmRemoveOrder] =
        useState(false);

    //
    const orderRedux = useSelector((state) => state?.order);

    //handle events
    const handleRemoveOrder = (orderId) => {
        // dispatch(removeOrder(orderId));
        // dispatch(getAllOrder());
    };

    const handleHideDetailOrder = () => {
        setIsAnimation(true);
        setTimeout(() => {
            setIsAnimation(false);
            setIsShowDetailOrder(null);
        }, 500);
    };

    return (
        <div>
            {orderRedux.orders?.length > 0 ? (
                <div className="overflow-y-auto scroll-none max-h-[600px] ">
                    {orderRedux.orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="mb-6 py-3  bg-gray-50 p-3 rounded-sm"
                        >
                            <div className="flex gap-3 items-center text-sm">
                                <div className="text-green-500 bg-green-100 px-2 py-1 rounded-md">
                                    {order.status}
                                </div>
                                <span className="max-md:hidden">
                                    Sản phẩm của bạn đang được xử lý
                                </span>
                                <span
                                    className="border-l px-3 text-gray-500 max-sm:border-none
                                                "
                                >
                                    Ngày đặt hàng:{' '}
                                    {new Date(order.createdAt).toLocaleString(
                                        'vi-VN',
                                        {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }
                                    )}
                                </span>
                            </div>

                            {isShowDetailOrder === index ? (
                                <motion.div
                                    initial={{ y: '-10%', opacity: 0 }}
                                    animate={{
                                        y:
                                            isShowDetailOrder && !isAnimation
                                                ? '0'
                                                : '-10%',
                                        opacity:
                                            isShowDetailOrder && !isAnimation
                                                ? 1
                                                : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {orderRedux.orders[index].products?.map(
                                        (items) => (
                                            <div
                                                key={items._id}
                                                className="flex justify-between items-center "
                                            >
                                                <div className="py-3 flex gap-3 items-center ">
                                                    <img
                                                        src={items.imageUrl}
                                                        alt=""
                                                        className="h-20 rounded-sm border border-gray-200"
                                                    />
                                                    <div className="flex flex-col gap-3">
                                                        <div className="font-semibold">
                                                            {items.nameProduct}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm">
                                                                {' '}
                                                                color: {''}
                                                                {items.colors}
                                                            </div>
                                                            <div className="text-sm">
                                                                sl: {''}
                                                                {items.quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {items.totalPriceProduct.toLocaleString(
                                                        'VN-vn'
                                                    )}
                                                    đ
                                                </div>
                                            </div>
                                        )
                                    )}
                                </motion.div>
                            ) : (
                                <div className="py-4">
                                    <div
                                        key={order.products[0]._id}
                                        className="flex justify-between items-center "
                                    >
                                        <div className="py-3 flex gap-3 items-center ">
                                            <img
                                                src={order.products[0].imageUrl}
                                                alt=""
                                                className="h-20 rounded-sm border border-gray-200"
                                            />
                                            <div className="flex flex-col gap-3">
                                                <div className="font-semibold">
                                                    {
                                                        order.products[0]
                                                            .nameProduct
                                                    }
                                                </div>
                                                <div>
                                                    <div className="text-sm">
                                                        {' '}
                                                        color: {''}
                                                        {
                                                            order.products[0]
                                                                .colors
                                                        }
                                                    </div>
                                                    <div className="text-sm">
                                                        sl: {''}
                                                        {
                                                            order.products[0]
                                                                .quantity
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {order.products[0].totalPriceProduct.toLocaleString(
                                                'VN-vn'
                                            )}
                                            đ
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* modal confirm order */}
                            {isShowModalConfirmRemoveOrder && (
                                <ConfirmRemoveOrder
                                    isShowModalConfirmRemoveOrder={
                                        isShowModalConfirmRemoveOrder
                                    }
                                    setIsShowModalConfirmRemoveOrder={
                                        setIsShowModalConfirmRemoveOrder
                                    }
                                    orderId={order._id}
                                    imgUrl={order.products[0].imageUrl}
                                    orderTotal={order.totalPrice}
                                />
                            )}

                            {/*  */}
                            <div className="flex flex-col items-end border-t py-3 border-gray-100">
                                <div className="flex gap-3 mb-3">
                                    <div className="text-gray-500">
                                        Tổng tiền: {''}
                                    </div>
                                    <div>
                                        {order.totalPrice.toLocaleString(
                                            'VN-vn'
                                        )}
                                        đ
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 items-center text-sm ">
                                    <button
                                        onClick={() =>
                                            setIsShowModalConfirmRemoveOrder(
                                                true
                                            )
                                        }
                                        className="bg-red-600 text-white px-3 py-2.5 hover:brightness-110 rounded-sm"
                                    >
                                        Hủy đơn hàng
                                    </button>
                                    <button
                                        onClick={() =>
                                            setIsShowDetailOrder(index)
                                        }
                                        className=" text-blue-500 border border-blue-500 px-3 py-2 hover:brightness-110  rounded-sm"
                                    >
                                        xem chi tiết
                                    </button>

                                    {isShowDetailOrder === index && (
                                        <button
                                            onClick={handleHideDetailOrder}
                                            className=" text-gray-500 border border-gray-400 px-3 py-2 hover:brightness-110  rounded-sm"
                                        >
                                            Thu gọn
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full bg-orange-100 flex gap-3 p-5 rounded-sm">
                    <img src={warning} alt="" className="h-5" />
                    <div className="text-yellow-600 text-sm ">
                        Bạn chưa đặt đơn hàng nào.
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllOrder;
