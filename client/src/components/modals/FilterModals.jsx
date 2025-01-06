/* eslint-disable react/display-name */
import { forwardRef, useState } from 'react';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'rc-slider';
import { motion } from 'framer-motion';

/* eslint-disable react/prop-types */
const FilterModals = forwardRef(
    (
        {
            filterSort,
            filterColors,
            setBtnId,
            handleSort,
            handleClickColors,
            valueRangePrice,
            handleRangeChange,
            handleInputChange,
            handleFocusInputPrice,
            handleBlurInputPrice,
            displayValues,
            colorIds,
            sortType,
            resetFilterSelected,
            btnId,
        },
        ref
    ) => {
        const [openSortInModel, setOpenSortInModel] = useState(false);
        const [openColorInModel, setOpenColorInModel] = useState(false);
        const [openPriceInModel, setOpenPriceInModel] = useState(false);
        const [isCloseModalAnimation, setCloseModalAnimation] = useState(false);
        const [isCloseMenuAnimationSort, setIsCloseMenuAnimationSort] =
            useState(false);
        const [isCloseMenuAnimationPrice, setIsCloseMenuAnimationPrice] =
            useState(false);
        const [isCloseMenuAnimationColor, setIsCloseMenuAnimationColor] =
            useState(false);

        const handleCloseModalFilter3 = () => {
            setCloseModalAnimation(true);
            setTimeout(() => {
                setBtnId(null);
                setCloseModalAnimation(false);
            }, 500);
        };

        const handleSortSelect = () => {
            if (openSortInModel) {
                setIsCloseMenuAnimationSort(true);
                setTimeout(() => {
                    setIsCloseMenuAnimationSort(false);
                    setOpenSortInModel(false);
                }, 300);
            } else {
                setOpenSortInModel(true);
            }
        };

        const handleShowMoreColorSelect = () => {
            if (openColorInModel) {
                setIsCloseMenuAnimationColor(true);
                setTimeout(() => {
                    setIsCloseMenuAnimationColor(false);
                    setOpenColorInModel(false);
                }, 300);
            } else {
                setOpenColorInModel(true);
            }
        };

        const handleSelectPrice = () => {
            if (openPriceInModel) {
                setIsCloseMenuAnimationPrice(true);
                setTimeout(() => {
                    setIsCloseMenuAnimationPrice(false);
                    setOpenPriceInModel(false);
                }, 300);
            } else {
                setOpenPriceInModel(true);
            }
        };

        return (
            <motion.div
                ref={(el) => (ref.current[4] = el)}
                className="fixed z-50 bg-black bg-opacity-50 top-0 right-0 left-0 bottom-0 overflow-y-scroll"
            >
                <motion.div
                    initial={{ x: 435 }}
                    animate={{
                        x: btnId == 3 && !isCloseModalAnimation ? 0 : 435,
                    }}
                    transition={{ duration: 0.5 }}
                    className="overflow-scroll py-5 bg-white max-lg:w-4/12
                             max-md:w-6/12 w-3/12 h-full fixed right-0 
                             max-sm:w-11/12"
                >
                    <h2 className="mb-4 px-5 text-lg flex justify-between items-center  font-semibold">
                        Lọc sản phẩm
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="cursor-pointer p-2"
                            onClick={handleCloseModalFilter3}
                        />
                    </h2>
                    <div>
                        <h3
                            onClick={handleSortSelect}
                            className="py-5   px-5  font-medium flex items-center justify-between"
                        >
                            Sắp xếp
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`${
                                    openSortInModel && 'rotate-90'
                                } transition duration-300 ease-in-out`}
                            />
                        </h3>
                        {openSortInModel && (
                            <motion.div
                                initial={{ y: '-5%', opacity: 0 }}
                                animate={{
                                    y:
                                        openSortInModel &&
                                        !isCloseMenuAnimationSort
                                            ? '0'
                                            : '-5%',
                                    opacity:
                                        openSortInModel &&
                                        !isCloseMenuAnimationSort
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="px-10"
                            >
                                {filterSort.map((item, index) => (
                                    <label
                                        key={index}
                                        htmlFor={item.value}
                                        className="flex gap-3"
                                    >
                                        <input
                                            type="radio"
                                            name="filterSort"
                                            id={item.value}
                                            checked={sortType === item.type}
                                            value={sortType}
                                            onChange={() =>
                                                handleSort(item.type)
                                            }
                                        />
                                        {item.name}
                                    </label>
                                ))}
                            </motion.div>
                        )}
                    </div>
                    <div>
                        <h3
                            onClick={handleShowMoreColorSelect}
                            className="py-5   px-5 font-medium flex items-center justify-between"
                        >
                            Màu Sắc
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`${
                                    openColorInModel && 'rotate-90'
                                } transition duration-300 ease-in-out`}
                            />
                        </h3>
                        <div className="grid grid-cols-4 gap-5 px-10 py-2">
                            {openColorInModel &&
                                filterColors?.map((color, index) => {
                                    return (
                                        <motion.div
                                            initial={{ y: '-5%', opacity: 0 }}
                                            animate={{
                                                y:
                                                    openColorInModel &&
                                                    !isCloseMenuAnimationColor
                                                        ? '0'
                                                        : '-5%',
                                                opacity:
                                                    openColorInModel &&
                                                    !isCloseMenuAnimationColor
                                                        ? 1
                                                        : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            key={index}
                                            className={`p-4 cursor-pointer rounded-sm shadow-home-product ${
                                                colorIds.includes(color.id)
                                                    ? 'scale-105 border-2 border-teal-300'
                                                    : 'scale-100 border-none'
                                            } transition-transform duration-300`}
                                            style={{
                                                backgroundColor:
                                                    color.codeColor,
                                            }}
                                            onClick={() =>
                                                handleClickColors(color.id)
                                            }
                                        ></motion.div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="px-5 mb-10">
                        <h3
                            onClick={handleSelectPrice}
                            className="py-5 font-medium flex items-center justify-between"
                        >
                            Giá
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className={`${
                                    openPriceInModel && 'rotate-90'
                                } transition duration-300 ease-in-out`}
                            />
                        </h3>
                        {openPriceInModel && (
                            <motion.div
                                initial={{ y: '-5%', opacity: 0 }}
                                animate={{
                                    y:
                                        openPriceInModel &&
                                        !isCloseMenuAnimationPrice
                                            ? '0'
                                            : '-5%',
                                    opacity:
                                        openPriceInModel &&
                                        !isCloseMenuAnimationPrice
                                            ? 1
                                            : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className=""
                            >
                                <div className="flex justify-between gap-3 w-full mb-4">
                                    <input
                                        type="text"
                                        className=" bg-bg-slider rounded-lg outline-none px-5 py-3 w-6/12"
                                        onChange={(e) =>
                                            handleInputChange(0, e.target.value)
                                        }
                                        onFocus={() => handleFocusInputPrice(0)}
                                        onBlur={() => handleBlurInputPrice(0)}
                                        value={displayValues[0]}
                                    />
                                    <input
                                        type="text"
                                        className=" bg-bg-slider rounded-lg outline-none px-5 py-3 w-6/12"
                                        onChange={(e) =>
                                            handleInputChange(1, e.target.value)
                                        }
                                        onFocus={() => handleFocusInputPrice(1)}
                                        onBlur={() => handleBlurInputPrice(1)}
                                        value={displayValues[1]}
                                    />
                                </div>
                                <div>
                                    <Slider
                                        range
                                        min={39000}
                                        max={25247000}
                                        value={valueRangePrice}
                                        onChange={handleRangeChange}
                                        allowCross={false} // Đảm bảo 2 đầu không bị chồng lên nhau
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/*  */}
                    <div className="mx-5 max-sm:flex-col max-sm:gap-4 flex justify-between">
                        <button
                            onClick={resetFilterSelected}
                            className="bg-red-700 border border-white text-white text-sm px-7 py-3 max-md:px-9   rounded-full"
                        >
                            Làm mới bộ lọc
                        </button>
                        <button
                            onClick={() => setBtnId(null)}
                            className="text-sm border border-red-700 px-7 py-3 max-md:px-9 max-sm:px-11 rounded-full"
                        >
                            Lọc sản phẩm
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        );
    }
);

export default FilterModals;
