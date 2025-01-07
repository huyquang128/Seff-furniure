/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    logout,
    setAddressDefault,
    setUpdateAddressContent,
} from '@/redux/authSlice';
import recycle_red_bold from '@/assets/svg/recycle_red_bold.svg';
import location_yellow from '@/assets/svg/location_yellow.svg';
import location from '@/assets/svg/location.svg';
import phone_black from '@/assets/svg/phone_black.svg';
import note_edit_black from '@/assets/svg/note_edit_black.svg';
import { useState } from 'react';
import AddNewAddressModals from '@/components/modals/AddNewAddressModals';
import RemoveAddress from '@/components/modals/RemoveAddress';

function DeliveryInformation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //
    const [isShowAddNewAddress, setIsShowAddNewAddress] = useState(false);
    const [isTitleAddressModal, setIsTitleAddressModal] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [isOpenModalRemoveAddress, setIsOpenModalRemoveAddress] =
        useState(false);
    const [addressId, setAddressId] = useState(null);
    const [addressTypeAddOrUpdate, setAddressTypeTypeAddOrUpdate] =
        useState('');

    //state redux
    const user = useSelector((state) => state.auth?.user);
    const urlImgAvatar = useSelector((state) => state?.auth.urlImgAvatar);
    const urlImgAvatarData = useSelector(
        (state) => state?.auth.user?.urlImgAvatar
    );

    const addressUser = useSelector((state) => state?.auth?.user?.address);
    const addressDefault = useSelector((state) => state?.auth?.addressDefault);

    const handleLogout = () => {
        dispatch(logout()).then((data) => {
            if (data.payload.success) {
                navigate('/auth/login');
            }
        });
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
        <>
            <div className="mb-5 text-black-text text-[18px]">
                Thông tin giao hàng
            </div>
            <div className="flex items-center gap-3 mb-6 text-sm">
                <Link to="/user/Personal-Information">
                    <div
                        onClick={handleLogout}
                        className="h-16 w-16 object-cover rounded-full border-2 
                            cursor-pointer bg-blue-400 flex justify-center items-center overflow-hidden"
                    >
                        {urlImgAvatar || urlImgAvatarData ? (
                            <img
                                src={urlImgAvatarData || urlImgAvatar}
                                alt=""
                                className="object-cover"
                                // onMouseLeave={handleCloseToolkitUser}
                            />
                        ) : (
                            <div className="text-white">H</div>
                        )}
                    </div>
                </Link>
                <div className="flex flex-col overflow-hidden max-w-60">
                    <span className="text-text-gray text-base">
                        {user.lastName && user.firstName
                            ? user?.firstName + ' ' + user?.lastName
                            : user?.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-start text-yellow-base "
                    >
                        Đăng Xuất
                    </button>
                </div>
            </div>
            <div>
                {/*  */}
                <div className="">
                    {addressUser && addressUser.length > 0 ? (
                        addressUser?.map((items, index) => (
                            <div
                                key={index}
                                className=" relative flex items-center justify-between p-4 border rounded-xl border-gray-200
                                                        mb-5 gap-5"
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
                                    {addressDefault !== index && (
                                        <div
                                            onClick={() =>
                                                dispatch(
                                                    setAddressDefault(index)
                                                )
                                            }
                                            className="text-sm text-yellow-base underline hover:brightness-110
                                                                                    cursor-pointer"
                                        >
                                            Sử dụng làm địa chỉ mặc định
                                        </div>
                                    )}
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
                                        <span className="text-red-600 ">
                                            Xóa
                                        </span>
                                    </button>
                                </div>
                                {addressDefault === index && (
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
                        <div className="w-full col-span-4 bg-orange-100 flex gap-3 p-5 rounded-sm mb-10">
                            <img src={location_yellow} alt="" className="h-5" />
                            <div className="text-yellow-600 text-sm ">
                                Bạn chưa có địa chỉ nào hãy{' '}
                                <span className="underline">
                                    <Link to="/user/manage-address">
                                        thêm địa chỉ mới
                                    </Link>
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/*  */}
                <div className="flex justify-between items-center text-sm mb-16">
                    <div className="text-yellow-base hover:brightness-110">
                        <Link to="/your-cart">Giỏ hàng</Link>
                    </div>
                    <button
                        onClick={() => navigate('/cart/checkout-step-2')}
                        type="submit"
                        className="px-4 py-4 bg-yellow-base text-white rounded-sm hover:brightness-110"
                    >
                        Tiếp tục đến phương thức thanh toán
                    </button>
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
                        setIsOpenModalRemoveAddress={
                            setIsOpenModalRemoveAddress
                        }
                        addressId={addressId}
                    />
                )}
            </div>
        </>
    );
}

export default DeliveryInformation;
