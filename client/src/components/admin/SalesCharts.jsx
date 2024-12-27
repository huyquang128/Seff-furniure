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
import { values } from 'lodash';

const data = [
    { name: 'Page A', hours: 4000 },
    { name: 'Page B', hours: 3000 },
    { name: 'Page C', hours: 2000 },
    { name: 'Page D', hours: 2780 },
    { name: 'Page E', hours: 1890 },
];
function SalesCharts() {
    const authRedux = useSelector((state) => state?.auth);

    return (
        <div className="bg-background p-5 w-full">
            <div className="mb-6 flex justify-between items-center">
                <span className="text-text-first text-xl font-medium">
                    Báo cáo
                </span>
                <img
                    src={authRedux.theme === 'light' ? more_black : more}
                    alt=""
                    className="cursor-pointer h-5"
                />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                    <CartesianGrid
                        strokeDasharray="1 0"
                        vertical={false}
                        stroke="#D9D9D9"
                    />
                    <XAxis />
                    <YAxis />
                    <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />

                    <Tooltip
                        content={<ReportSalesDashboardToolkit />}
                        coordinate={{ x: 10, y: 0 }}
                        offset={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SalesCharts;
