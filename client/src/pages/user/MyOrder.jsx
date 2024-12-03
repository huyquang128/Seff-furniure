import warning from '@/assets/svg/warning.svg';
import search from '@/assets/svg/search.svg';
import filter_1 from '@/assets/svg/filter_1.svg';
import { useSelector } from 'react-redux';
import NavigationStatusOrder from './NavigationStatusOrder';
import { Outlet } from 'react-router-dom';

function MyOrder() {
    return (
        <>
            <div className="flex justify-between items-center mb-5 max-md:block">
                {/* title */}
                <div className="text-2xl max-md:mb-4">Đơn hàng của tôi</div>

                {/* act filter */}
                <div className="flex text-sm gap-2 w-5/12 max-md:w-full">
                    <div
                        className="flex border items-center px-4 py-3 rounded-lg gap-3 outline outline-1 outline-gray-100
                                    hover:outline-yellow-base hover:outline-2 w-9/12
                                    cursor-pointer transition-all ease-in-out duration-75
                                    "
                    >
                        <img src={search} alt="" className="h-5" />
                        <input
                            type="text"
                            placeholder="Tìm đơn hàng"
                            className="outline-none max-h-[50px] "
                        />
                    </div>
                    <button className="bg-black-second text-white rounded-lg flex-1 flex items-center justify-center gap-3">
                        <div>Lọc</div>
                        <img src={filter_1} alt="" className="h-4" />
                    </button>
                </div>
            </div>
            <NavigationStatusOrder />
            <Outlet />
        </>
    );
}

export default MyOrder;
