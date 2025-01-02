/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import add_white from '@/assets/svg/add_white.svg';
import more from '@/assets/svg/more.svg';
import more_black from '@/assets/svg/more_black.svg';
import edit_1 from '@/assets/svg/edit_1.svg';
import recycle_gray_bold from '@/assets/svg/recycle_gray_bold.svg';
import email from '@/assets/svg/email.svg';
import arr_sort from '@/assets/svg/admin/arr_sort.svg';
import arr_sort_white from '@/assets/svg/admin/arr_sort_white.svg';
import { useEffect, useState } from 'react';
import AddUserModal from '@/components/modals/AddUserModal';
import avatar from '@/assets/image/avatar.jpg';
import calendar from '@/assets/svg/calendar.svg';
import MoreSelectActUser from '@/components/toolkits/MoreSelectActUser';
import { motion } from 'framer-motion';
import ConfirmRemoveUser from '@/components/modals/ConfirmRemoveUser';
import { setAddUser, setTypeUser } from '@/redux/authSlice';

function FormList({ type, categoryList, stateStore, stateArr }) {
    const dispatch = useDispatch();

    const authRedux = useSelector((state) => state?.auth);

    const [arrCheckboxAllRemove, setArrCheckboxAllRemove] = useState([]);
    const [isShowMoreAct, setShowMoreAct] = useState(false);
    const [isAnimationRemoveBtn, setIsAnimationRemoveBtn] = useState(false);
    const [titleModalAddUser, setTitleModalAddUser] = useState('');
    const [isCheckboxAllRemoveUser, setIsCheckBoxAllRemoveUser] =
        useState(false);
    const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
    const [typeAndIdUserDeleted, setTypeAndIdUserDeleted] = useState({});
    const [isShowModalConfirmRemove, setIsShowModalConfirmRemove] =
        useState(false);

    //hook
    useEffect(() => {
        const arr = stateArr.map((item) => item._id);
        arr.length === arrCheckboxAllRemove?.length
            ? setIsCheckBoxAllRemoveUser(true)
            : setIsCheckBoxAllRemoveUser(false);
    }, [arrCheckboxAllRemove]);

    // handle events
    const handleAddUser = ({ title, form }) => {
        setIsShowModalAddUser(true);
        setTitleModalAddUser(title);

        title === 'Thêm khách hàng'
            ? dispatch(
                  setTypeUser({
                      type: true,
                      form: {
                          username: '',
                          email: '',
                          password: '',
                          phone: '',
                      },
                  })
              )
            : dispatch(setTypeUser({ type: false, form }));
    };

    const handleCheckAll = () => {
        setIsCheckBoxAllRemoveUser(!isCheckboxAllRemoveUser);

        if (!isCheckboxAllRemoveUser) {
            setArrCheckboxAllRemove(stateArr.map((item) => item._id));
        } else {
            setArrCheckboxAllRemove([]);
        }
    };

    const handleCheckSingle = (id) => {
        if (arrCheckboxAllRemove.includes(id)) {
            setArrCheckboxAllRemove(
                arrCheckboxAllRemove.filter((item) => item !== id)
            );
            setIsCheckBoxAllRemoveUser(false);
        } else {
            setArrCheckboxAllRemove((prev) => {
                return [...prev, id];
            });
        }
    };

    const handleRemoveUserChecked = ({ id, type }) => {
        setIsShowModalConfirmRemove(true);
        setTypeAndIdUserDeleted({ type, id });
    };

    return (
        <div className="px-5 py-5">
            <div className="flex justify-between items-center gap-5 mb-5">
                <div className="text-xl text-text-first font-medium">
                    {type === 'customer'
                        ? 'Danh sách khách hàng'
                        : 'Danh sách đơn hàng'}
                </div>
                {type === 'customer' && (
                    <button
                        onClick={() =>
                            handleAddUser({ title: 'Thêm khách hàng' })
                        }
                        className="flex min-w-[180px] p-4 bg-black text-white rounded-lg text-sm gap-2"
                    >
                        <div>Thêm khách hàng</div>
                        <img src={add_white} alt="" className="h-5" />
                    </button>
                )}
            </div>

            {/* modal add user */}
            {isShowModalAddUser && (
                <AddUserModal
                    isShowModalAddUser={isShowModalAddUser}
                    setIsShowModalAddUser={setIsShowModalAddUser}
                    title={titleModalAddUser}
                />
            )}

            {/*  */}
            <div>
                {/* category */}
                <div
                    className="grid grid-cols-12 items-center text-sm font-medium 
                            text-text-first py-4"
                >
                    <div
                        className={`${
                            type === 'orders' && 'col-span-2'
                        } col-span-1 max-sm:col-span-2 px-4 flex gap-2`}
                    >
                        <input
                            type="checkbox"
                            checked={isCheckboxAllRemoveUser}
                            className="w-4 h-4 cursor-pointer"
                            onChange={handleCheckAll}
                        />
                        {type === 'orders' && <div>Mã ĐH</div>}
                    </div>
                    {categoryList.map((item, index) => (
                        <div
                            key={index}
                            className={`${
                                (type === 'customer' &&
                                    index === 0 &&
                                    'col-span-3 max-lg:col-span-4 max-sm:col-span-7') ||
                                (type === 'orders' &&
                                    index === 0 &&
                                    'hidden') ||
                                (index === 1 &&
                                    'col-span-3 max-lg:col-span-4 max-sm:hidden') ||
                                (type === 'customer' &&
                                    index === 2 &&
                                    'col-span-2 max-lg:hidden') ||
                                (type === 'orders' &&
                                    index === 2 &&
                                    'col-span-3 max-lg:hidden') ||
                                (index === 3 &&
                                    type === 'orders' &&
                                    'col-span-2 max-lg:hidden')
                            } flex gap-1.5 items-center  col-span-1 `}
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
                    {arrCheckboxAllRemove.length > 0 && (
                        <motion.div
                            initial={{ y: '-50%', opacity: '0' }}
                            animate={{
                                y:
                                    arrCheckboxAllRemove.length > 0 &&
                                    !isAnimationRemoveBtn
                                        ? '0%'
                                        : '-50%',
                                opacity:
                                    arrCheckboxAllRemove.length > 0 &&
                                    !isAnimationRemoveBtn
                                        ? '1'
                                        : '0',
                            }}
                            transition={{ duration: 0.3 }}
                            className={`${
                                type === 'orders' ? 'col-span-1' : ''
                            }col-span-2 max-lg:col-span-3 max-md:col-span-3 text-end`}
                        >
                            <button
                                onClick={handleRemoveUserChecked}
                                className=" px-4 py-1.5 rounded-md border border-gray-500
                            hover:bg-black hover:text-white transition-all ease-linear duration-300"
                            >
                                Xóa
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* list customer */}
                <div className="text-sm">
                    {stateArr?.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-12 py-4 items-center text-text-first
                                    bg-background rounded-lg mb-4"
                        >
                            <div
                                className={`max-sm:col-span-2 px-4 items-center ${
                                    type === 'orders' &&
                                    'flex items-center gap-3 col-span-2'
                                } `}
                            >
                                <input
                                    onChange={() => handleCheckSingle(item._id)}
                                    type="checkbox"
                                    checked={arrCheckboxAllRemove.includes(
                                        item._id
                                    )}
                                    className={`${
                                        type === 'orders' && 'translate-y-0'
                                    } w-4 h-4 translate-y-3 cursor-pointer`}
                                />
                                {type === 'orders' && (
                                    <div className="">
                                        #{item._id.slice(0, 6)}
                                    </div>
                                )}
                            </div>

                            <div
                                className="flex items-center gap-2 col-span-3 max-lg:col-span-4
                                        max-sm:col-span-9"
                            >
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
                                    {type === 'customer'
                                        ? item.lastName
                                            ? item.firstName +
                                              ' ' +
                                              item.lastName
                                            : item.username
                                        : item.fullname}
                                </div>
                            </div>
                            <div className="flex col-span-3 gap-2 max-lg:col-span-6 max-sm:hidden items-center">
                                <img
                                    src={
                                        type === 'customer'
                                            ? email
                                            : item.products[0].imageUrl
                                    }
                                    alt=""
                                    className={
                                        type === 'orders' && 'h-10 rounded-md'
                                    }
                                />
                                <div>
                                    {type === 'customer'
                                        ? item.email
                                        : item.products[0].nameProduct}
                                </div>
                            </div>
                            {type === 'customer' && (
                                <div className="col-span-2 max-lg:hidden">
                                    {item.phone.replace(
                                        /(\d{3})\d{4}(\d{3})/,
                                        '$1****$2'
                                    )}
                                </div>
                            )}

                            <div
                                className={`${
                                    type === 'customer'
                                        ? 'col-span-1'
                                        : 'col-span-2'
                                }  max-lg:hidden flex gap-2`}
                            >
                                <img src={calendar} alt="" />
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>

                            {type === 'orders' && (
                                <div
                                    className="col-span-1 max-lg:hidden flex gap-2 
                                                text-xs  justify-center"
                                >
                                    <div
                                        className="w-28  bg-green-base text-whiter flex justify-center
                                                    py-2  rounded-3xl"
                                    >
                                        {' '}
                                        {item.status === 'processing' &&
                                            'Đang chờ'}
                                    </div>
                                </div>
                            )}
                            {type === 'customer' && (
                                <div className="col-span-2 flex justify-end px-5 items-center gap-5 max-lg:hidden">
                                    <img
                                        onClick={() =>
                                            handleAddUser({
                                                title: 'Cập nhật thông tin',
                                                form: {
                                                    username: item.username,
                                                    email: item.email,
                                                    password: item.password,
                                                    phone: item.phone,
                                                },
                                            })
                                        }
                                        src={edit_1}
                                        alt=""
                                        className="h-4 cursor-pointer"
                                    />
                                    <img
                                        onClick={() =>
                                            handleRemoveUserChecked({
                                                id: item._id,
                                                type: 'remove-single',
                                            })
                                        }
                                        src={recycle_gray_bold}
                                        alt=""
                                        className="h-4 cursor-pointer"
                                    />
                                </div>
                            )}

                            <div className="lg:hidden flex justify-center">
                                <img
                                    src={
                                        authRedux.theme === 'light'
                                            ? more_black
                                            : more
                                    }
                                    alt=""
                                    className="cursor-pointer h-5 "
                                />
                                {isShowMoreAct && (
                                    <MoreSelectActUser
                                        isShowMoreAct={isShowMoreAct}
                                        setShowMoreAct={setShowMoreAct}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {isShowModalConfirmRemove && (
                    <ConfirmRemoveUser
                        isShowModalConfirmRemove={isShowModalConfirmRemove}
                        setIsShowModalConfirmRemove={
                            setIsShowModalConfirmRemove
                        }
                        arrCheckboxAllRemove={arrCheckboxAllRemove}
                        type={typeAndIdUserDeleted.type}
                        id={typeAndIdUserDeleted.id}
                        typePage={type}
                    />
                )}
            </div>
        </div>
    );
}

export default FormList;
