/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import avatar from '@/assets/image/avatar.jpg';
import arrDown2 from '@/assets/svg/arr-down-2.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDistrictsFromVN,
    getProvincesFromVN,
    getWardsFromVN,
} from '@/redux/provinceSlice';
import { motion } from 'framer-motion';
import { logout } from '@/redux/authSlice';
import {
    setDistricts,
    setValueDistrict,
    setValueFormUser,
    setValueProvince,
    setValueWard,
    setWards,
} from '@/redux/orderSlice';

const formInput = [
    {
        type: 'text',
        placeholder: 'Họ và tên',
        label: 'Họ và tên',
        name: 'fullname',
    },
    {
        type: 'text',
        placeholder: 'Số điện thoại',
        label: 'Số điện thoại',
        name: 'phone',
    },
    {
        type: 'text',
        placeholder: 'Địa chỉ',
        label: 'Địa chỉ',
        name: 'detailAddress',
    },
];

const formSelectCityVn = [
    { label: 'Chọn tỉnh / thành ' },
    { label: 'Chọn quận / huyện' },
    { label: 'Chọn phường / xã' },
];

function DeliveryInformation() {
    // const [filterWardsToDistrict, setFilterWardsToDistrict] = useState([]);
    const provinces = useSelector((state) => state.province?.province);
    const districts = useSelector((state) => state.province?.district);
    const wards = useSelector((state) => state.province?.ward);
    const user = useSelector((state) => state.auth?.user);

    const valueFormUser = useSelector(
        (state) => state.order?.temporaryOrder.valueFormUser
    );

    const errorMessageInputs = useSelector(
        (state) => state.order?.errorMessageInputs
    );
    const valueProvince = useSelector(
        (state) => state.order?.temporaryOrder.valueProvince
    );
    const valueDistrict = useSelector(
        (state) => state.order?.temporaryOrder.valueDistrict
    );
    const valueWard = useSelector(
        (state) => state.order?.temporaryOrder.valueWard
    );

    const filterDistrictsToProvince = useSelector(
        (state) => state.order?.filterDistrictsToProvince
    );

    const filterWardsToDistrict = useSelector(
        (state) => state.order?.filterWardsToDistrict
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProvincesFromVN());
    }, [dispatch]);

    // filter Districts To Province
    useEffect(() => {
        if (valueProvince) {
            dispatch(getDistrictsFromVN()).then((data) => {
                if (data) {
                    const filterDistrictToProvince = districts?.filter(
                        (district) =>
                            district.province_code === valueProvince.code
                    );

                    dispatch(setDistricts(filterDistrictToProvince));
                }
            });
        } else {
            dispatch(setDistricts([]));
        }
    }, [dispatch, valueProvince]);

    // filter ward To district
    useEffect(() => {
        if (valueDistrict) {
            dispatch(getWardsFromVN()).then((data) => {
                if (data) {
                    const filterWardToDistrict = wards?.filter(
                        (ward) => ward.district_code === valueDistrict.code
                    );

                    dispatch(setWards(filterWardToDistrict));
                }
            });
        } else {
            dispatch(setWards([]));
        }
    }, [dispatch, valueDistrict]);

    const handleChangeValueProvince = (e) => {
        const filterToCodeProvince = provinces.find(
            (province) => province.name === e.target.value
        );
        dispatch(
            setValueProvince({
                value: e.target.value,
                code: filterToCodeProvince.code,
            })
        );
    };

    // / Hàm xử lý khi chọn huyện
    const handleChangeValueDistrict = (e) => {
        const selectedDistrict = filterDistrictsToProvince?.find(
            (district) => district.name === e.target.value
        );

        if (selectedDistrict) {
            dispatch(
                setValueDistrict({
                    value: e.target.value,
                    code: selectedDistrict.code,
                })
            );
        }
    };

    // Hàm xử lý khi chọn xã/phường
    const handleChangeValueWard = (e) => {
        const selectedWard = filterWardsToDistrict?.find(
            (ward) => ward.name === e.target.value
        );

        if (selectedWard) {
            dispatch(
                setValueWard({
                    value: e.target.value,
                    code: selectedWard.district_code,
                })
            );
        }
    };

    const handleOnInput = (index, nameInput) => {
        // dispatch(setOnInput(index));
    };

    const handleBlur = (index, value) => {
        // dispatch(setErrorMessageInput({ index, value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="mb-5 text-black-text text-[18px]">
                Thông tin giao hàng
            </div>
            <div className="flex gap-3 mb-6 text-sm">
                <img src={avatar} alt="avatar" className="h-12 rounded-full" />
                <div className="flex flex-col">
                    <span className="text-text-gray">
                        {user?.username}(gmail.com)
                    </span>
                    <button
                        onClick={() => dispatch(logout())}
                        className="text-start text-yellow-base "
                    >
                        Đăng Xuất
                    </button>
                </div>
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className="relative mb-4">
                    <select
                        name=""
                        id=""
                        className="rounded-md w-full pt-5 pr-10 pb-1 pl-3 text-sm bg-white "
                    >
                        <option value="">hà nội</option>
                        <option value=""></option>
                    </select>
                    <label className="absolute top-1 left-3 text-xs text-text-gray-second">
                        Thêm địa chỉ mới...
                    </label>
                    <div className="bg-gray-300 h-2/4 w-[0.5px] absolute right-10 top-[50%] -translate-y-[50%]"></div>
                    <img
                        src={arrDown2}
                        alt=""
                        className="absolute right-2 top-[50%] -translate-y-[50%]"
                    />
                </div>

                {/* form info user */}
                <div>
                    {formInput.map((element, index) => (
                        <div
                            key={index}
                            className="relative mb-4 text-black-text"
                            // onFocus={() =>
                            //     handleFocusInput(index, element.name)
                            // }
                            onInput={() => handleOnInput(index)}
                        >
                            <motion.input
                                className={`w-full ${
                                    valueFormUser[element.name]
                                        ? 'pt-5 pb-1'
                                        : 'pt-3 pb-3'
                                }  pr-10  pl-3 text-sm rounded-lg ${
                                    valueFormUser[element.name]
                                        ? 'placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-300 placeholder:ease-in-out'
                                        : 'placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-300 placeholder:ease-in-out'
                                }`}
                                placeholder={
                                    valueFormUser[element.name]
                                        ? ''
                                        : element.placeholder
                                }
                                value={valueFormUser[element.name] || ''}
                                onChange={(e) =>
                                    dispatch(
                                        setValueFormUser({
                                            name: element.name,
                                            value: e.target.value,
                                        })
                                    )
                                }
                            />
                            <div
                                // initial={{ opacity: 0 }}
                                // animate={{ opacity: isValidInput ? 1 : 0 }}
                                // transition={{ duration: 300 }}
                                className="text-valid-input text-xs mt-1 "
                            >
                                {errorMessageInputs[index]}
                            </div>
                            <motion.label
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: valueFormUser[element.name]
                                        ? 1
                                        : 0,
                                }}
                                className="absolute top-1 left-3 text-xs text-text-gray-second font-normal"
                            >
                                {element.label}
                            </motion.label>
                        </div>
                    ))}
                </div>

                {/* form select provinces current */}
                <div className=" mb-10 flex gap-3 flex-wrap">
                    {formSelectCityVn.map((element, index) => (
                        <div
                            key={index}
                            className="relative w-4/12 max-md:w-full"
                        >
                            <select
                                name=""
                                id=""
                                className={`rounded-md w-full ${
                                    (index === 0 && valueProvince?.value) ||
                                    (index === 1 && valueDistrict?.value) ||
                                    (index === 2 && valueWard?.value)
                                        ? 'pt-5 pb-1'
                                        : 'pt-3 pb-3'
                                }  pr-10  pl-3 text-sm relative bg-white`}
                                onChange={
                                    index === 0
                                        ? handleChangeValueProvince
                                        : index === 1
                                        ? handleChangeValueDistrict
                                        : handleChangeValueWard
                                }
                                disabled={
                                    (index === 1 && !valueProvince) ||
                                    (index === 2 && !valueDistrict)
                                }
                            >
                                <option value="">
                                    {(index === 0 && valueProvince?.value) ||
                                    (index === 1 && valueDistrict?.value) ||
                                    (index === 2 && valueWard?.value)
                                        ? ''
                                        : element.label}
                                </option>
                                {index === 0 &&
                                    provinces?.map((province) => (
                                        <option
                                            key={province.code}
                                            value={province.name}
                                        >
                                            {province.name}
                                        </option>
                                    ))}
                                {index === 1 &&
                                    filterDistrictsToProvince?.length > 0 &&
                                    filterDistrictsToProvince?.map(
                                        (district) => (
                                            <option
                                                key={district.code}
                                                value={district.name}
                                            >
                                                {district.name}
                                            </option>
                                        )
                                    )}
                                {index === 2 &&
                                    filterWardsToDistrict?.length > 0 &&
                                    filterWardsToDistrict.map((ward) => (
                                        <option
                                            key={ward.code}
                                            value={ward.name}
                                        >
                                            {ward.name}
                                        </option>
                                    ))}
                            </select>
                            <motion.label
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        (index === 0 && valueProvince?.value) ||
                                        (index === 1 && valueDistrict?.value) ||
                                        (index === 2 && valueWard?.value)
                                            ? 1
                                            : 0,
                                }}
                                className="absolute top-1 left-3 text-xs text-text-gray-second"
                            >
                                {(index === 0 && valueProvince?.value) ||
                                (index === 1 && valueDistrict?.value) ||
                                (index === 2 && valueWard?.value)
                                    ? element.label
                                    : ''}
                            </motion.label>
                            <div className="absolute top-2/4 -translate-y-2/4 right-0 flex items-center justify-center  ">
                                <div className="bg-gray-300  px-[0.3px] py-[10px]"></div>
                                <img src={arrDown2} alt="" className="" />
                            </div>
                        </div>
                    ))}
                </div>

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
            </form>
        </>
    );
}

export default DeliveryInformation;
