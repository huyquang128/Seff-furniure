import visa from '@/assets/image/visa.png';
import checkoutImgCvvHint from '@/assets/image/checkout-img-cvv-hint.jpg';
import chip from '@/assets/svg/chip.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';

const formCredit = [
    { name: 'Số thẻ', placeholder: 'VD: 2918 1029 9129 0122' },
    { name: 'Tên in trên thẻ', placeholder: 'VD: NGUYEN VAN A' },
    { name: 'Ngày hết hạn', placeholder: 'VD: MM/YY' },
    { name: 'Mã bảo mật', placeholder: 'VD: 123' },
];
function CreditCardModal({ setShowModalCreditCard, showModalCreditCard }) {
    const [showModalCreditCardAnimation, setShowModalCreditCardAnimation] =
        useState(false);

    const [isFocusInput, setIsFocusInput] = useState(null);
    const [flipped, setFlipped] = useState(false);

    const handleCloseModalsCredit = () => {
        setShowModalCreditCardAnimation(true);

        setTimeout(() => {
            setShowModalCreditCardAnimation(false);
            setShowModalCreditCard(false);
        }, 400);
    };

    const handleFocusInput = (index) => {
        setFlipped(true);

        setTimeout(() => {
            setFlipped(false);
            setIsFocusInput(index);
        }, 100);
    };
    return (
        <div className="fixed  z-20 top-0 right-0 left-0 bottom-0 bg-models">
            <motion.div
                initial={{ x: -750 }}
                animate={{
                    x:
                        showModalCreditCard && !showModalCreditCardAnimation
                            ? 0
                            : -750,
                }}
                transition={{ duration: 0.4 }}
                className="w-6/12 max-md:w-9/12 max-sm:w-11/12 h-full bg-white p-7 overflow-y-scroll"
            >
                <div className="flex justify-between items-center max-lg:flex-col ">
                    {/* input */}
                    <div className="w-2/4 max-lg:w-full">
                        <h3 className="font-medium text-lg">
                            Thêm Thẻ Tín Dụng/ Ghi Nợ Quốc Tế
                        </h3>
                        <div>
                            <img src={visa} alt="" />
                        </div>
                        {formCredit.map((credit, index) => (
                            <div key={index}>
                                <label className="mb-2 mt-6 block text-sm ">
                                    {credit.name}:
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder={credit.placeholder}
                                        className={`${
                                            index === 3 || index === 2
                                                ? 'w-2/5'
                                                : 'w-full'
                                        } py-2 px-4 rounded-md placeholder:text-gray-400`}
                                        onFocus={() => handleFocusInput(index)}
                                    />
                                    {index === 3 && (
                                        <img
                                            src={checkoutImgCvvHint}
                                            alt=""
                                            className="w-20 h-10 object-contain rounded-sm"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        className="credit"
                        animate={{
                            rotateY: isFocusInput === 3 && !flipped ? 180 : 0,
                        }}
                        transition={{ duration: 0.4, linear: true }}
                    >
                        {/* card front */}
                        <div
                            className={`w-[290px] h-[182px]  py-5 px-6 rounded-xl max-lg:hidden ${
                                isFocusInput === 3 ? 'hidden' : ''
                            }`}
                            style={{
                                background:
                                    'linear-gradient(25deg, rgb(153, 153, 153), rgb(153, 153, 153))',
                            }}
                        >
                            <img src={chip} alt="" className="h-6 mb-6" />
                            <div
                                className={`${
                                    isFocusInput === 0
                                        ? 'opacity-100'
                                        : 'opacity-50'
                                } text-white text-4xl mb-4 transition-all duration-300 ease-in-out`}
                            >
                                •••• •••• •••• ••••
                            </div>
                            <div
                                className="flex justify-between items-center transition-all duration-300
                             ease-in-out"
                            >
                                <span
                                    className={`text-white ${
                                        isFocusInput === 1
                                            ? 'opacity-100'
                                            : 'opacity-50'
                                    }`}
                                >
                                    TÊN CHỦ THẺ
                                </span>
                                <div
                                    className={`text-white ${
                                        isFocusInput === 2
                                            ? 'opacity-100'
                                            : 'opacity-50'
                                    } flex flex-col items-center`}
                                >
                                    <span className="text-xs">
                                        hiệu lực đến
                                    </span>
                                    <span className="text-xl">••/••</span>
                                </div>
                            </div>
                        </div>

                        {/* card backside */}
                        {isFocusInput === 3 && (
                            <div
                                className="w-[290px] h-[182px] py-5 rounded-xl relative max-lg:hidden"
                                style={{
                                    background:
                                        'linear-gradient(25deg, rgb(153, 153, 153), rgb(153, 153, 153))',
                                }}
                            >
                                <div className="h-10 bg-[#2a1d16] mb-2"></div>
                                <div
                                    className="h-10 w-9/12 ml-16"
                                    style={{
                                        background:
                                            'repeating-linear-gradient(0.1deg, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 40%, rgb(255, 238, 170) 40%, rgb(255, 238, 170) 44%, rgb(255, 255, 255) 44%)',
                                    }}
                                ></div>
                            </div>
                        )}
                    </motion.div>
                </div>
                <div className="mt-12 mb-6 text-sm bg-bg-blue text-text-blue p-3 rounded-md">
                    Homecor không trực tiếp lưu thẻ của bạn. Để đảm bảo an toàn,
                    thông tin thẻ của bạn chỉ được lưu bởi CyberSource, công ty
                    quản lý thanh toán lớn nhất thế giới (thuộc tổ chức VISA)
                </div>
                <div className="flex justify-between max-sm:flex-wrap max-md:gap-3 ">
                    <button
                        onClick={handleCloseModalsCredit}
                        className="w-6/12 max-sm:w-full border mr-3 max-sm:mr-0 border-yellow-base text-yellow-base  px-20 py-2 rounded-sm "
                    >
                        Trở lại
                    </button>
                    <button className="w-6/12 max-sm:w-full bg-yellow-base text-white px-10 py-3 rounded-sm ">
                        Xác nhận
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default CreditCardModal;
