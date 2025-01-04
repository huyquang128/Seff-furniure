import add_white from '@/assets/svg/add_white.svg';
import add_bold_white from '@/assets/svg/add_bold_white.svg';
import phone_black from '@/assets/svg/phone_black.svg';
import note_edit_black from '@/assets/svg/note_edit_black.svg';
import recycle_red_bold from '@/assets/svg/recycle_red_bold.svg';
import { useState } from 'react';
import AddNewAddressModals from '@/components/modals/AddNewAddressModals';
import { useDispatch, useSelector } from 'react-redux';
import location from '@/assets/svg/location.svg';
import location_yellow from '@/assets/svg/location_yellow.svg';
import {
    getProfileUser,
    removeAddressUser,
    setUpdateAddressContent,
} from '@/redux/authSlice';
import RemoveAddress from '@/components/modals/RemoveAddress';

function ManageAddress() {
    const dispatch = useDispatch();
    const [isShowAddNewAddress, setIsShowAddNewAddress] = useState(false);
    const [isTitleAddressModal, setIsTitleAddressModal] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [isOpenModalRemoveAddress, setIsOpenModalRemoveAddress] =
        useState(false);
    const [addressId, setAddressId] = useState(null);
    const [addressTypeAddOrUpdate, setAddressTypeTypeAddOrUpdate] =
        useState('');

    // state redux
    const addressUser = useSelector((state) => state?.auth.user.address);
    const addressDefault = useSelector((state) => state?.auth.addressDefault);

    //handle events
    const handleAddNewAddress = () => {
        setIsShowAddNewAddress(true);
        setIsTitleAddressModal('Thêm địa chỉ mới');
        setButtonText('Thêm địa chỉ');
        setAddressTypeTypeAddOrUpdate('add new address');
        dispatch(
            setUpdateAddressContent({
                type: 'add new address ',
                firstName: '',
                lastName: '',
                phone: '',
                detailed: '',
                province: '',
                district: '',
                ward: '',
            })
        );
    };

    const handleUpdateAddress = (
        index,
        firstName,
        lastName,
        phone,
        detailed,
        province,
        district,
        ward,
        addressId
    ) => {
        setIsShowAddNewAddress(true);
        setIsTitleAddressModal('Thay đổi địa chỉ hiện tại');
        setButtonText('Thay đổi ');
        setAddressId(addressId);
        dispatch(
            setUpdateAddressContent({
                type: 'update address',
                firstName,
                lastName,
                phone,
                detailed,
                province,
                district,
                ward,
            })
        );
        setAddressTypeTypeAddOrUpdate('update address');
    };

    const handleRemoveAddress = (addressId) => {
        setIsOpenModalRemoveAddress(true);
        setAddressId(addressId);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-xl">Quản lý địa chỉ</h1>
                <button
                    onClick={handleAddNewAddress}
                    className="bg-black-second flex px-6 py-3 items-center gap-2 rounded-md
                                    hover:brightness-110"
                >
                    <img src={add_bold_white} alt="" className="h-5" />
                    <span className="text-sm text-white">Thêm địa chỉ mới</span>
                </button>
            </div>

            {/* Add your address management logic here */}
            <div className="">
                {addressUser && addressUser.length > 0 ? (
                    addressUser?.map((items, index) => (
                        <div
                            key={index}
                            className=" relative flex items-center justify-between p-4 border rounded-xl border-gray-200
                                        mb-5 max-md:gap-3"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="font-medium text-black-base">
                                    {items.firstName + ' ' + items.lastName}
                                </div>
                                <div className="text-sm flex gap-2 items-center">
                                    <img src={location} alt="" />
                                    <div>
                                        <div>{items.detailed}</div>
                                        <div>
                                            {items.province +
                                                ', ' +
                                                items.district +
                                                ', ' +
                                                items.ward}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 text-sm">
                                    <img
                                        src={phone_black}
                                        alt=""
                                        className="h-4 px-1"
                                    />
                                    <span>
                                        (+84){' '}
                                        {items.phone?.replace(
                                            /(\d{3})\d{4}(\d{3})/,
                                            '$1****$2'
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() =>
                                        handleUpdateAddress(
                                            index,
                                            items.firstName,
                                            items.lastName,
                                            items.phone,
                                            items.detailed,
                                            items.province,
                                            items.district,
                                            items.ward,
                                            items._id
                                        )
                                    }
                                    className=" flex text-sm justify-center hover:outline hover:outline-1 hover:outline-gray-200 items-center gap-2 bg-gray-100 py-2 w-20 rounded-md"
                                >
                                    <img
                                        src={note_edit_black}
                                        alt=""
                                        className="-translate-y-[1px]"
                                    />
                                    <span>Sửa</span>
                                </button>
                                <button
                                    onClick={() =>
                                        handleRemoveAddress(items._id)
                                    }
                                    className=" flex justify-center text-sm hover:outline hover:outline-1 hover:outline-red-200 items-center gap-2 bg-red-50 py-2 w-20 rounded-md"
                                >
                                    <img
                                        src={recycle_red_bold}
                                        alt=""
                                        className="-translate-y-[2px] h-4"
                                    />
                                    <span className="text-red-600 ">Xóa</span>
                                </button>
                            </div>
                            {addressDefault === items._id && (
                                <div
                                    className="absolute left-6 px-2 py-0.5 top-1 -translate-y-3.5 text-xs bg-gray-200 
                                    text-text-gray rounded-md"
                                >
                                    Mặc định
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="w-full col-span-4 bg-orange-100 flex gap-3 p-5 rounded-sm">
                        <img src={location_yellow} alt="" className="h-5" />
                        <div className="text-yellow-600 text-sm ">
                            Bạn chưa thêm địa chỉ nào.
                        </div>
                    </div>
                )}
            </div>
            {isShowAddNewAddress && (
                <AddNewAddressModals
                    isShowAddNewAddress={isShowAddNewAddress}
                    setIsShowAddNewAddress={setIsShowAddNewAddress}
                    isTitleAddressModal={isTitleAddressModal}
                    buttonText={buttonText}
                    addressId={addressId}
                    addressTypeAddOrUpdate={addressTypeAddOrUpdate}
                />
            )}

            {isOpenModalRemoveAddress && (
                <RemoveAddress
                    isOpenModalRemoveAddress={isOpenModalRemoveAddress}
                    setIsOpenModalRemoveAddress={setIsOpenModalRemoveAddress}
                    addressId={addressId}
                />
            )}
        </div>
    );
}

export default ManageAddress;
