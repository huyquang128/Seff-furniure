import {
    getDistrictsFromVN,
    getProvincesFromVN,
    getWardsFromVN,
} from '@/redux/provinceSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    setDistricts,
    setValueDistrict,
    setValueProvince,
    setValueWard,
    setWards,
} from '@/redux/authSlice';

const formSelectCityVn = [
    { label: 'Chọn tỉnh / thành ' },
    { label: 'Chọn quận / huyện' },
    { label: 'Chọn phường / xã' },
];

function FormSelectAddress() {
    const dispatch = useDispatch();

    //state redux
    const provinces = useSelector((state) => state.province?.province);
    const districts = useSelector((state) => state.province?.district);
    const wards = useSelector((state) => state.province?.ward);

    const valueProvince = useSelector(
        (state) => state.auth?.temporary.valueProvince
    );
    const valueDistrict = useSelector(
        (state) => state.auth?.temporary.valueDistrict
    );
    const valueWard = useSelector((state) => state.auth?.temporary.valueWard);
    const filterDistrictsToProvince = useSelector(
        (state) => state.auth?.filterDistrictsToProvince
    );

    const filterWardsToDistrict = useSelector(
        (state) => state.auth?.filterWardsToDistrict
    );

    const isLabelSelectProvince = useSelector(
        (state) => state?.auth.isLabelSelectProvince
    );

    //hook
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
    return (
        <div className=" mb-2 flex gap-3 flex-wrap transition-all ease-in-out duration-300">
            {formSelectCityVn.map((element, index) => (
                <div key={index} className=" w-full max-md:w-full">
                    {formSelectCityVn.map((item, index2) => {
                        const result = index === index2 && item.label && (
                            <div key={index2} className="flex gap-0.5">
                                <label className=" left-3 text-sm text-black-base">
                                    {item.label}
                                </label>
                                <div className="text-[7px] text-red-700">
                                    <FontAwesomeIcon icon={faAsterisk} />
                                </div>
                            </div>
                        );

                        return result;
                    })}

                    <select
                        name=""
                        id=""
                        className={`rounded-md w-full py-2.5 pr-10 mb-2 pl-3 text-sm relative bg-foreground mt-2
                                    transition-all ease-in-out duration-75 cursor-pointer `}
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
                            {(isLabelSelectProvince &&
                                index === 0 &&
                                valueProvince.value) ||
                                (isLabelSelectProvince &&
                                    index === 1 &&
                                    valueDistrict.value) ||
                                (isLabelSelectProvince &&
                                    index === 2 &&
                                    valueWard.value) ||
                                element.label}
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
                            filterDistrictsToProvince?.map((district) => (
                                <option
                                    key={district.code}
                                    value={district.name}
                                >
                                    {district.name}
                                </option>
                            ))}
                        {index === 2 &&
                            filterWardsToDistrict?.length > 0 &&
                            filterWardsToDistrict.map((ward) => (
                                <option key={ward.code} value={ward.name}>
                                    {ward.name}
                                </option>
                            ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

export default FormSelectAddress;
