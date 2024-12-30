/* eslint-disable react/jsx-no-duplicate-props */
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import more from '@/assets/svg/more.svg';
import more_black from '@/assets/svg/more_black.svg';
import { useSelector } from 'react-redux';
import ReportSalesDashboardToolkit from '../toolkits/ReportSalesDashboardToolkit';
import CustomActiveDot from './CustomActiveDot';

const data = [
    { name: '10am', length: 85, quantity: 4018 },
    { name: '11am', length: 39, quantity: 1150 },
    { name: '12am', length: 40, quantity: 3040 },
    { name: '1am', length: 52, quantity: 2020 },
    { name: '2am', length: 47, quantity: 3204 },
    { name: '3am', length: 60, quantity: 5602 },
    { name: '4am', length: 50, quantity: 1200 },
    { name: '5am', length: 70, quantity: 2050 },
    { name: '6am', length: 60, quantity: 1150 },
    { name: '7am', length: 70, quantity: 2050 },
    { name: '8am', length: 60, quantity: 3040 },
    { name: '9am', length: 70, quantity: 2050 },
];
function SalesCharts() {
    const authRedux = useSelector((state) => state?.auth);

    return (
        <div className="bg-background p-5 w-full rounded-lg">
            <div className="mb-6 flex justify-between items-center text-gray-400">
                <span className="text-text-first text-xl">
                    Báo cáo
                </span>
                <img
                    src={authRedux.theme === 'light' ? more_black : more}
                    alt=""
                    className="cursor-pointer h-5"
                />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="1 0"
                        vertical={false}
                        stroke={`${
                            authRedux.theme === 'light' ? '#D9D9D9' : '#6b7280'
                        }`}
                    />
                    <XAxis
                        tickLine={false}
                        axisLine={false}
                        dataKey="name"
                        tick={{
                            fontSize: 14,
                            fill: `${
                                authRedux.theme === 'light' ? '#9ca3af' : '#fff'
                            }`,
                            dy: 15,
                        }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fontSize: 14,
                            fill: `${
                                authRedux.theme === 'light' ? '#9ca3af' : '#fff'
                            }`,
                            dx: -15,
                        }}
                        ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <defs>
                        <linearGradient
                            id="customGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop
                                offset="0%"
                                stopColor="#3A36DB"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="100%"
                                stopColor="#FF69B4"
                                stopOpacity={0.8}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />

                    <Area
                        type="monotone"
                        dataKey="length"
                        stroke={`${
                            authRedux.theme === 'light' ? '#fff' : '#273142'
                        }`}
                        fill="url(#customGradient)"
                        activeDot={<CustomActiveDot />}
                    />

                    {/* linear gradient #3A36DB 50% #FF69B4 35% */}

                    <Tooltip
                        content={<ReportSalesDashboardToolkit />}
                        coordinate={{ x: 10, y: 0 }}
                        offset={2}
                        dot={false}
                        cursor={false}
                        // Tùy chỉnh chấm khi hover
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesCharts;
