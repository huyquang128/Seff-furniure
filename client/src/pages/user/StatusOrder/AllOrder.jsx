import { useSelector } from 'react-redux';
import warning from '@/assets/svg/warning.svg';

function AllOrder() {
    const orderRedux = useSelector((state) => state?.order);

    return (
        <div>
            {orderRedux.orders ? (
                <div className="overflow-y-auto scroll-none max-h-[600px] ">
                    {orderRedux.orders.map((order) => (
                        <div
                            key={order._id}
                            className="mb-6 py-3  bg-gray-50 p-3 rounded-sm"
                        >
                            <div className="flex gap-3 items-center text-sm">
                                <div className="text-green-500 bg-green-100 px-2 py-1 rounded-md">
                                    {order.status}
                                </div>
                                <span className='max-md:hidden'>Sản phẩm của bạn đang được xử lý</span>
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

                            {/*  */}
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
                                                {order.products[0].nameProduct}
                                            </div>
                                            <div>
                                                <div className="text-sm">
                                                    {' '}
                                                    color: {''}
                                                    {order.products[0].colors}
                                                </div>
                                                <div className="text-sm">
                                                    sl: {''}
                                                    {order.products[0].quantity}
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

                            {/*  */}
                            {/* <div>
                        {order.products.map((product) => (
                            <div
                                key={product._id}
                                className="py-3 flex gap-3 items-center"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt=""
                                    className="h-20 rounded-sm"
                                />
                                <div>
                                    <div>{product.nameProduct}</div>
                                    <div>
                                        {' '}
                                        color: {''}
                                        {product.colors}
                                    </div>
                                    <div>
                                        sl: {''}
                                        {product.quantity}
                                    </div>
                                </div>
                                <div>
                                    {product.totalPriceProduct.toLocaleString(
                                        'VN-vn'
                                    )}
                                    đ
                                </div>
                            </div>
                        ))}
                    </div> */}

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
                                    <button className="bg-red-600 text-white px-3 py-2.5 hover:brightness-110 rounded-sm">
                                        Hủy đơn hàng
                                    </button>
                                    <button className=" text-blue-500 border border-blue-500 px-3 py-2 hover:brightness-110  rounded-sm">
                                        xem chi tiết
                                    </button>
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
