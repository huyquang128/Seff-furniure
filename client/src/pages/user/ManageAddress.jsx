import add_white from '@/assets/svg/add_white.svg';
import add_bold_white from '@/assets/svg/add_bold_white.svg';
import phone_black from '@/assets/svg/phone_black.svg';
import note_edit_black from '@/assets/svg/note_edit_black.svg';
import recycle_red_bold from '@/assets/svg/recycle_red_bold.svg';
import { useState } from 'react';
import AddNewAddressModals from '@/components/modals/AddNewAddressModals';

const listAddress = [
    {
        titleUser: 'John',
        address: 'số 1 ngách 40 ngõ 43 hà nội',
        phone: '0192312323',
    },
    {
        titleUser: 'John',
        address: 'số 1 ngách 40 ngõ 43 hà nội',
        phone: '0192312323',
    },
    {
        titleUser: 'John',
        address: 'số 1 ngách 40 ngõ 43 hà nội',
        phone: '0192312323',
    },
];
function ManageAddress() {
    const [isShowAddNewAddress, setIsShowAddNewAddress] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-xl">Quản lý địa chỉ</h1>
                <button
                    className="bg-black-second flex px-6 py-3 items-center gap-2 rounded-md
                                    hover:brightness-110"
                >
                    <img src={add_bold_white} alt="" className="h-5" />
                    <span
                        onClick={() => setIsShowAddNewAddress(true)}
                        className="text-sm text-white"
                    >
                        Thêm địa chỉ mới
                    </span>
                </button>
            </div>

            {/* Add your address management logic here */}
            <div>
                {listAddress.map((address, index) => (
                    <div
                        key={index}
                        className="flex justify-between p-4 border-b border-gray-100"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold">
                                {address.titleUser}
                            </div>
                            <div className="text-sm">{address.address}</div>
                            <div className="flex gap-3 text-sm">
                                <img src={phone_black} alt="" className="h-4" />
                                <span>{address.phone}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button className=" flex text-sm hover:outline hover:outline-1 hover:outline-gray-200 items-center gap-2 bg-gray-100 py-2 px-4 rounded-md">
                                <img
                                    src={note_edit_black}
                                    alt=""
                                    className="-translate-y-[1px]"
                                />
                                <span>Sửa</span>
                            </button>
                            <button className=" flex text-sm hover:outline hover:outline-1 hover:outline-red-200 items-center gap-2 bg-red-50 py-2 px-4 rounded-md">
                                <img
                                    src={recycle_red_bold}
                                    alt=""
                                    className="-translate-y-[2px] h-4"
                                />
                                <span className="text-red-600 ">Xóa</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isShowAddNewAddress && (
                <AddNewAddressModals
                    isShowAddNewAddress={isShowAddNewAddress}
                    setIsShowAddNewAddress={setIsShowAddNewAddress}
                />
            )}
        </div>
    );
}

export default ManageAddress;
