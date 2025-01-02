import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import show_pass from '@/assets/svg/show_pass.svg';
import hide_pass from '@/assets/svg/hide_pass.svg';
import { motion } from 'framer-motion';
import FormSelectAddress from './FormSelectAddress';
import { setAddressDefault } from '@/redux/authSlice';

/* eslint-disable react/prop-types */
function FormCommon({
    form,
    setForm,
    formController,
    buttonText,
    onSubmit,
    type,
    namePropertyInput,
    setNamePropertyInput,
    isValidForm,
    setIsValidForm,
    addressId,
}) {
    console.log('🚀 ~ type:', type);
    const dispatch = useDispatch();
    const [isShowPass, setIsShowPass] = useState(false);
    const [isAnimationValid, setAnimationValid] = useState(false);
    const addressDefault = useSelector((state) => state?.auth.addressDefault);

    //events
    const handleTogglePass = () => {
        setIsShowPass(!isShowPass);
    };

    const handleBlur = (e, nameInput, errorMessage1) => {
        if (e.target.value.trim() === '') {
            setNamePropertyInput({
                ...namePropertyInput,
                [nameInput]: errorMessage1,
            });
        }
    };

    const handleEnterInput = (e, nameInput, errorMessage2) => {
        setIsValidForm(false);
        if (nameInput === 'password' && e.target.value.length < 6) {
            setNamePropertyInput({
                ...namePropertyInput,
                [nameInput]: errorMessage2,
            });
        } else {
            setAnimationValid(true);
            setTimeout(() => {
                setAnimationValid(false);
                setNamePropertyInput({
                    ...namePropertyInput,
                    [nameInput]: '',
                });
            }, 300);
        }
    };

    const renderForm = (formControl) => {
        let element = null;
        const value = form[formControl.name] || '';

        switch (formControl.componentType) {
            case 'input':
                element = (
                    <input
                        type={
                            isShowPass && formControl.type === 'password'
                                ? 'text'
                                : formControl.type
                        }
                        name={formControl.name}
                        placeholder={formControl.placeholder}
                        id={formControl.name}
                        className={` ${
                            (type === 'auth' &&
                                `border-none outline outline-1 ${
                                    namePropertyInput[formControl.name]
                                        ? 'outline-red-400'
                                        : 'outline-gray-200'
                                }  hover:outline hover:outline-2 hover:outline-yellow-base`) ||
                            (type === 'form-info-user' &&
                                'border-none outline outline-1 outline-gray-200 hover:outline-yellow-base hover:outline-2 ')
                        } text-sm p-3 w-full outline outline-1 outline-background rounded-md transition-all ease-linear duration-75
                          hover:outline-2 hover:outline-yellow-base focus:outline-2 focus:outline-yellow-base ${
                              type === 'setting-admin'
                                  ? 'bg-background'
                                  : 'bg-foreground'
                          } text-text-first
                         
                        `}
                        value={value}
                        onChange={(e) =>
                            dispatch(
                                setForm({
                                    name: formControl.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        onBlur={(e) =>
                            handleBlur(
                                e,
                                formControl.name,
                                formControl.errorMessage1
                            )
                        }
                        onInput={(e) =>
                            handleEnterInput(
                                e,
                                formControl.name,
                                formControl.errorMessage2
                            )
                        }
                    />
                );
                break;
            case 'textarea':
                element = (
                    <textarea
                        name={formControl.name}
                        placeholder={formControl.placeholder}
                        id={formControl.name}
                        value={value}
                        onChange={(e) =>
                            dispatch(
                                setForm({
                                    name: formControl.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        className={`p-2 rounded-md text-sm h-40 outline outline-1 outline-background
                                  hover:outline-2  hover:outline-yellow-base transition-all 
                                  ease-in-out duration-75 ${
                                      type === 'setting-admin'
                                          ? 'bg-background'
                                          : 'bg-foreground'
                                  } text-text-first`}
                    ></textarea>
                );
                break;

            case 'select':
                element = (
                    <select
                        value={value}
                        onChange={(e) =>
                            dispatch(
                                setForm({
                                    name: formControl.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        className={`p-3 rounded-lg cursor-pointer text-sm ${
                            value ? 'text-text-first' : 'text-gray-400'
                        } bg-foreground outline outline-background `}
                    >
                        <option value="" className="text-text-first">
                            Chọn thương hiệu
                        </option>
                        {formControl.options && formControl.options.length > 0
                            ? formControl.options.map((option) => (
                                  <option
                                      key={option.id}
                                      value={option.id}
                                      className="cursor-pointer text-sm text-text-first"
                                  >
                                      {option.label}
                                  </option>
                              ))
                            : null}
                    </select>
                );
                break;

            default:
                element = (
                    <input
                        type={
                            isShowPass && formControl.type === 'password'
                                ? 'text'
                                : formControl.type
                        }
                        name={formControl.name}
                        placeholder={formControl.placeholder}
                        id={formControl.name}
                        className={` ${
                            (type === 'auth' &&
                                `border-none outline outline-1 ${
                                    namePropertyInput[formControl.name]
                                        ? 'outline-red-400'
                                        : 'outline-gray-200'
                                }  hover:outline hover:outline-2 hover:outline-yellow-base`) ||
                            (type === 'form-info-user' &&
                                'border-none outline outline-1 outline-gray-200 hover:outline-yellow-base hover:outline-2 ')
                        } text-sm p-3 w-full outline outline-1 outline-background rounded-md transition-all ease-linear duration-75
                            hover:outline-2 hover:outline-yellow-base ${
                                type === 'setting-admin'
                                    ? 'bg-background'
                                    : 'bg-foreground'
                            } text-text-first
                        `}
                        value={value}
                        onChange={(e) =>
                            dispatch(
                                setForm({
                                    name: formControl.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        onBlur={(e) =>
                            handleBlur(
                                e,
                                formControl.name,
                                formControl.errorMessage1
                            )
                        }
                        onInput={(e) =>
                            handleEnterInput(
                                e,
                                formControl.name,
                                formControl.errorMessage2
                            )
                        }
                    />
                );
                break;
        }

        return element;
    };

    return (
        <>
            <form
                onSubmit={onSubmit}
                className={`${
                    type === 'form-info-user'
                        ? 'w-full grid grid-cols-2 grid-rows-4 gap-10 max-md:grid-cols-1'
                        : ''
                }`}
            >
                {formController.map((formControl, index) => (
                    <div
                        key={index}
                        className={` ${
                            type === 'form-info-user'
                                ? 'col-span-1'
                                : 'flex flex-col mb-4 relative'
                        } ${index === 4 ? 'col-span-2 max-md:col-span-1' : ''}`}
                    >
                        <label
                            htmlFor={formControl.name}
                            className={`mb-2 text-sm flex gap-[2px] text-black-text ${
                                (type === 'auth' && 'max-md:text-white') ||
                                (type === 'addProduct' && 'text-text-first') ||
                                (type === 'add user' && 'text-text-first') ||
                                ''
                            }`}
                        >
                            {formControl.label}
                            <div className="text-[7px] text-red-700 -translate-y-1">
                                <FontAwesomeIcon icon={faAsterisk} />
                            </div>
                        </label>
                        {renderForm(formControl, index)}
                        {formControl?.name === 'password' && (
                            <div
                                onClick={handleTogglePass}
                                className="absolute top-10 right-3 text-yellow-base cursor-pointer"
                            >
                                <img
                                    src={isShowPass ? show_pass : hide_pass}
                                    alt=""
                                    className="h-6"
                                />
                            </div>
                        )}
                        {type === 'auth' && (
                            <motion.div
                                initial={{ y: '-100%', opacity: 0 }}
                                animate={{
                                    y:
                                        isValidForm ||
                                        (namePropertyInput[formControl.name] &&
                                            !isAnimationValid)
                                            ? '0'
                                            : '-100%',
                                    opacity:
                                        isValidForm ||
                                        (namePropertyInput[formControl.name] &&
                                            !isAnimationValid)
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-xs mt-[2px] text-red-500 "
                            >
                                {(isValidForm && 'Trường này là bắt buộc') ||
                                    namePropertyInput[formControl.name]}
                            </motion.div>
                        )}
                    </div>
                ))}
                {type === 'auth' && (
                    <div className="flex justify-between text-sm -translate-y-3">
                        <label className="flex gap-1 cursor-pointer text-black-base max-md:text-white">
                            <input type="checkbox" />
                            <span>Ghi nhớ</span>
                        </label>
                        <div
                            className="cursor-pointer text-yellow-base hover:brightness-105
                                        max-md:brightness-125"
                        >
                            Quên mật khẩu?
                        </div>
                    </div>
                )}

                {type === 'formAddAddressNew' && <FormSelectAddress />}

                {type === 'formAddAddressNew' && (
                    <label
                        htmlFor="add-default-address"
                        className="flex items-center gap-2 cursor-pointer "
                    >
                        <input
                            type="checkbox"
                            id="add-default-address"
                            checked={addressId === addressDefault}
                            value={addressDefault}
                            onChange={() =>
                                dispatch(setAddressDefault(addressId))
                            }
                        />
                        <span className="text-xs hover:text-yellow-base font-medium text-black-text">
                            Sử dụng làm địa chỉ mặc định
                        </span>
                    </label>
                )}

                <button
                    className="mt-6 w-full text-sm cursor-pointer py-3 rounded-full bg-yellow-base 
                                text-white max-lg:mb-2 hover:brightness-105"
                >
                    {buttonText}
                </button>
            </form>
        </>
    );
}

export default FormCommon;
