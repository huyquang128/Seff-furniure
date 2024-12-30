/* eslint-disable react/prop-types */
import arr_down_2_pink from '@/assets/svg/arr_down_2_pink.svg';
function ReportSalesDashboardToolkit({ active, payload, label }) {
    return (
        <div className=" bg-[#FF69B4] -translate-y-24 right-1/4 -translate-x-1/4 flex flex-col relative items-center text-white px-10 rounded-xl py-2">
            <div>Sales</div>
            <div className="text-xl font-medium">
                {payload[0]?.payload.quantity}
            </div>
            <img
                src={arr_down_2_pink}
                alt=""
                className="absolute h-12 bottom-0 translate-y-7"
            />
        </div>
    );
}
//

export default ReportSalesDashboardToolkit;
