import { useSelector } from 'react-redux';
import add_white from '@/assets/svg/add_white.svg';
import more from '@/assets/svg/more.svg';
import more_black from '@/assets/svg/more_black.svg';
import edit_1 from '@/assets/svg/edit_1.svg';
import recycle_gray_bold from '@/assets/svg/recycle_gray_bold.svg';
import email from '@/assets/svg/email.svg';
import arr_sort from '@/assets/svg/admin/arr_sort.svg';
import arr_sort_white from '@/assets/svg/admin/arr_sort_white.svg';
import { useState } from 'react';
import AddUserModal from '@/components/modals/AddUserModal';
import avatar from '@/assets/image/avatar.jpg';

const categoryListUser = [
    { name: 'Name', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Email', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Số điện thoại', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Ngày tạo', img_white: arr_sort_white, img_black: arr_sort },
];
function Customer() {
    const authRedux = useSelector((state) => state?.auth);

    //
    const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

    //
    const handleAddUser = () => {
        setIsShowModalAddUser(true);
    };
    return (
        <div className="px-5 py-5">
            <div className="flex justify-between items-center">
                <div className="text-xl text-text-first font-medium">
                    Danh sách khách hàng
                </div>
                <button
                    onClick={handleAddUser}
                    className="flex p-4 bg-black text-white rounded-lg text-sm gap-2"
                >
                    <div>Thêm khách hàng</div>
                    <img src={add_white} alt="" className="h-5" />
                </button>
            </div>

            {/* modal add user */}

            {isShowModalAddUser && (
                <AddUserModal
                    isShowModalAddUser={isShowModalAddUser}
                    setIsShowModalAddUser={setIsShowModalAddUser}
                />
            )}

            {/*  */}
            <div>
                {/* category */}
                <div
                    className="grid grid-cols-12 items-center text-sm font-medium 
                                text-text-first py-4"
                >
                    <input type="checkbox" className="h-4" />
                    {categoryListUser.map((item, index) => (
                        <div
                            key={index}
                            className={`${
                                (index === 0 &&
                                    'col-span-3 max-md:col-span-4') ||
                                (index === 1 &&
                                    'col-span-3 max-md:col-span-5') ||
                                (index === 2 && 'col-span-2 max-md:hidden') ||
                                (index === 3 && 'col-span-1 max-md:hidden')
                            } flex gap-1.5 items-center`}
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
                    <div className="col-span-2  text-center">
                        <button
                            className=" px-4 py-1.5 rounded-md border border-gray-500
                                hover:bg-black hover:text-white transition-all ease-linear duration-300"
                        >
                            Xóa tất cả
                        </button>
                    </div>
                </div>

                {/* list customer */}
                <div className="text-sm">
                    {authRedux.allUser?.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-12 py-4 items-center text-text-first
                                        bg-background rounded-lg mb-4 "
                        >
                            <input type="checkbox" className="h-4" />
                            <div className="flex items-center gap-2 col-span-3 max-md:col-span-4">
                                <img
                                    src={
                                        item.urlImgAvatar
                                            ? item.urlImgAvatar
                                            : avatar
                                    }
                                    alt=""
                                    className="h-12 rounded-full"
                                />
                                <div>
                                    {item.lastName
                                        ? item.firstName + ' ' + item.lastName
                                        : item.username}
                                </div>
                            </div>
                            <div className="flex col-span-3 gap-2 max-md:col-span-5">
                                <img src={email} alt="" />
                                <div>{item.email}</div>
                            </div>
                            <div className="col-span-2 max-md:hidden">
                                {item.phone}
                            </div>
                            <div className="col-span-1 max-md:hidden">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                            <div className="col-span-2 flex justify-center items-center gap-5">
                                <img
                                    src={edit_1}
                                    alt=""
                                    className="h-4 cursor-pointer"
                                />
                                <img
                                    src={recycle_gray_bold}
                                    alt=""
                                    className="h-4 cursor-pointer"
                                />
                                {/* <img
                                    src={
                                        authRedux.theme === 'light'
                                            ? more_black
                                            : more
                                    }
                                    alt=""
                                    className="cursor-pointer h-5"
                                /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Customer;
