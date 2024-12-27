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
import { useSelector } from 'react-redux';
import arr_down_light from '@/assets/svg/arr-down-light_1.svg';
import SalesCharts from '@/components/admin/SalesCharts';

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
function Dashboard() {
    const authRedux = useSelector((state) => state?.auth);

    return (
        <div className="px-10 py-5">
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
            <div className="grid grid-cols-4 gap-6 mb-6">
                {listStatistics.map((item, index) => (
                    <div
                        key={index}
                        className=" bg-background px-3 py-5 rounded-lg"
                    >
                        <div className="flex justify-between items-center mb-5">
                            <div className="">
                                <div className="mb-3 text-lg text-text-gray-1">
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
                        <div className="flex gap-2">
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
        </div>
    );
    // ca8a04
}

export default Dashboard;
