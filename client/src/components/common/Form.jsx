import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import show_pass from '@/assets/svg/show_pass.svg';
import hide_pass from '@/assets/svg/hide_pass.svg';

/* eslint-disable react/prop-types */
function FormCommon({
    form,
    setForm,
    formController,
    buttonText,
    onSubmit,
    type,
}) {
    const dispatch = useDispatch();
    const [isShowPass, setIsShowPass] = useState(false);

    const handleTogglePass = () => {
        setIsShowPass(!isShowPass);
    };

    const renderForm = (formControl, index) => {
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
                            type === 'auth'
                                ? 'border-none hover:outline hover:outline-2 outline-yellow-base'
                                : ''
                        } text-sm p-3 w-full rounded-md`}
                        value={value}
                        onChange={(e) =>
                            dispatch(
                                setForm({
                                    name: formControl.name,
                                    value: e.target.value,
                                })
                            )
                        }
                    />
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
                            type === 'auth'
                                ? 'border-none text-sm hover:outline hover:outline-2 outline-yellow-base'
                                : ''
                        } p-3 w-full`}
                        value={value}
                        onChange={(e) =>
                            dispatch(
                                setForm({
                                    name: formControl.name,
                                    value: e.target.value,
                                })
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
                        ? 'grid grid-cols-2 grid-rows-4 gap-10 max-md:grid-cols-1'
                        : ''
                }`}
            >
                {formController.map((formControl, index) => (
                    <div
                        key={index}
                        className={` ${
                            type === 'form-info-user'
                                ? ''
                                : 'flex flex-col mb-4 relative'
                        } ${index === 4 ? 'col-span-2 max-md:col-span-1' : ''}`}
                    >
                        <label
                            htmlFor={formControl.name}
                            className={`mb-2 text-sm flex gap-[2px] text-black-text ${
                                type === 'auth' ? 'max-md:text-white' : ''
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
                                className="absolute top-1/2 right-3 text-yellow-base"
                            >
                                <img
                                    src={isShowPass ? show_pass : hide_pass}
                                    alt=""
                                    className="h-7"
                                />
                            </div>
                        )}
                    </div>
                ))}
                {type === 'formAddAddressNew' && (
                    <label
                        htmlFor="add-default-address"
                        className="flex items-center gap-2 cursor-pointer "
                    >
                        <input type="checkbox" id="add-default-address" />
                        <span className="text-xs hover:text-yellow-base font-medium text-black-text">
                            Sử dụng làm địa chỉ mặc định
                        </span>
                    </label>
                )}

                <button
                    className="mt-6 w-full text-sm cursor-pointer py-3 rounded-full bg-yellow-base 
                                text-white mb-3 hover:brightness-105"
                >
                    {buttonText}
                </button>
            </form>
        </>
    );
}

export default FormCommon;
