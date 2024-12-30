import BlockStatisticAll from '@/components/admin/BlockStatisticAll';
import user_3_light from '@/assets/svg/user_3_light.svg';
import user_3_dark from '@/assets/svg/user_3_dark.svg';
import trending_up from '@/assets/svg/trending_up.svg';
import trending_down from '@/assets/svg/trending_down.svg';
import order_light from '@/assets/svg/order_light.svg';
import order_dark from '@/assets/svg/order_dark.svg';
import sales_dark from '@/assets/svg/sales_dark.svg';
import sales_light from '@/assets/svg/sales_light.svg';
import pending_light from '@/assets/svg/pending_light.svg';
import pending_dark from '@/assets/svg/pending_dark.svg';
import { useDispatch, useSelector } from 'react-redux';
import arr_down_light from '@/assets/svg/arr-down-light_1.svg';
import SalesCharts from '@/components/admin/SalesCharts';
import more from '@/assets/svg/more.svg';
import more_black from '@/assets/svg/more_black.svg';
import arr_sort from '@/assets/svg/admin/arr_sort.svg';
import arr_sort_white from '@/assets/svg/admin/arr_sort_white.svg';
import { getAllOrder, getOrders } from '@/redux/orderSlice';
import { useEffect } from 'react';
import { getProductTopSelling } from '@/redux/productSlice';

const listStatistics = [
    { name: 'Tổng khách hàng', img_light: user_3_light, img_dark: user_3_dark },
    { name: 'Tổng đơn hàng', img_light: order_light, img_dark: order_dark },
    { name: 'Tổng doanh thu', img_light: sales_light, img_dark: sales_dark },
    {
        name: 'Tổng chờ xử lý',
        img_light: pending_light,
        img_dark: pending_dark,
    },
];
const categoryOrder = [
    { name: 'Mã đơn hàng', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Sản phẩm', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Giá', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Tổng đơn hàng', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Tổng số tiền', img_white: arr_sort_white, img_black: arr_sort },
];

function Dashboard() {
    const dispatch = useDispatch();
    const authRedux = useSelector((state) => state?.auth);
    const orderRedux = useSelector((state) => state?.order);
    const productRedux = useSelector((state) => state?.products);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductTopSelling());
    }, [dispatch]);

    return (
        <div className="px-5 py-5">
            <div className="flex justify-between items-center  mb-5">
                <div className="text-xl text-text-first font-medium">
                    Bảng điều khiển
                </div>
                <div className="flex gap-2 relative cursor-pointer">
                    <select
                        name=""
                        id="dashboard-select"
                        className="outline-none hover:outline-none hover:border-none border-none text-sm
                                 cursor-pointer rounded-lg focus:outline-none pl-5 pr-10 py-3 bg-blue-800 text-white"
                    >
                        <option value="" className="">
                            Tháng 12 - 2024
                        </option>
                    </select>
                    <img
                        src={arr_down_light}
                        alt=""
                        className="absolute right-2.5 top-1/2 -translate-y-1/2
                        "
                    />
                </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 mb-6">
                {listStatistics.map((item, index) => (
                    <div key={index} className=" bg-background p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-5">
                            <div className="">
                                <div className="mb-3 text-base text-text-gray-1">
                                    {item.name}
                                </div>
                                <div className="text-2xl font-bold text-text-first">
                                    40,012
                                </div>
                            </div>
                            <img
                                src={
                                    authRedux.theme === 'light'
                                        ? item.img_light
                                        : item.img_dark
                                }
                                alt=""
                            />
                        </div>
                        <div className="flex gap-2 items-center text-sm">
                            <img src={trending_up} alt="" />
                            <div className="text-green-base">8.5%</div>
                            <div className="text-text-gray-1">
                                Up from yesterday
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/*  */}

            <SalesCharts />

            {/*  */}
            <div className="flex max-lg:flex-wrap mt-5 gap-5">
                {/* recent orders */}
                <div className=" bg-background p-5 w-8/12 max-lg:w-full max-lg: rounded-lg">
                    <div className="flex justify-between">
                        <div className="text-lg text-text-first">
                            Đơn hàng gần đây
                        </div>
                        <img
                            src={
                                authRedux.theme === 'light' ? more_black : more
                            }
                            alt=""
                            className="cursor-pointer h-5"
                        />
                    </div>
                    {/* ... */}
                    <div>
                        {/* category order */}
                        <div
                            className="grid grid-cols-12 items-center text-sm
                                        text-text-first py-4 border-b border-gray-100
                                        gap-3"
                        >
                            {categoryOrder.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${
                                        (index === 0 && 'col-span-2') ||
                                        (index === 1 && 'col-span-3 max-md:col-span-5') ||
                                        (index === 2 && 'col-span-2 max-md:hidden') ||
                                        (index === 3 && 'col-span-3 justify-center max-md:hidden') ||
                                        (index === 4 &&
                                            'col-span-2 justify-center')
                                    } flex gap-1.5 items-center text-center`}
                                >
                                    <span>{item.name}</span>
                                    <img
                                        src={
                                            authRedux.theme === 'light'
                                                ? arr_sort
                                                : arr_sort_white
                                        }
                                        alt=""
                                        className="h-[7px] translate-y-0.5"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* order */}
                        <div>
                            {orderRedux.orders.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="grid grid-cols-12 py-4 items-center text-sm text-text-gray-1
                                                gap-3"
                                >
                                    <div className="col-span-2">
                                        #{item._id.slice(0, 8)}
                                    </div>
                                    <div className="col-span-3 flex items-center gap-2 max-md:col-span-5">
                                        <img
                                            src={item.products[0].imageUrl}
                                            alt=""
                                            className="h-10 rounded-lg"
                                        />
                                        <div>
                                            {item.products[0].nameProduct}
                                        </div>
                                    </div>
                                    <div className="col-span-2 max-md:hidden">
                                        {item.products[0].totalPriceProduct.toLocaleString(
                                            'VN-vn'
                                        )}
                                        đ
                                    </div>
                                    <div className="col-span-3 text-center max-md:hidden">
                                        <span className="bg-blue-700 px-8 py-1.5 text-white rounded-md">
                                            {item.products[0].quantity}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        {item.products[0].totalPriceProduct.toLocaleString(
                                            'VN-vn'
                                        )}
                                        đ
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* block top sales product */}
                <div className="bg-background p-5 w-4/12 max-lg:w-full rounded-lg">
                    <div className="flex justify-between items-center gap-2">
                        <div className="text-lg text-text-first py-2">
                            Sản phẩm bán chạy nhất
                        </div>
                        <img
                            src={
                                authRedux.theme === 'light' ? more_black : more
                            }
                            alt=""
                            className="cursor-pointer h-5 "
                        />
                    </div>
                    <div className="h-96 overflow-y-scroll">
                        {productRedux.productTopSelling.map((item) => (
                            <div
                                key={item._id}
                                className="flex mt-7 gap-3 text-text-first"
                            >
                                <img
                                    src={item.colors[0].images[0]}
                                    alt=""
                                    className="h-20 object-cover rounded-lg"
                                />

                                <div>
                                    <div className="font-medium">
                                        {item.name}
                                    </div>
                                    <div className="text-sm">
                                        {item.price.toLocaleString('VN-vn')}đ
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
