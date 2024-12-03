import cash from '@/assets/image/cash.png';
import vtmoney from '@/assets/image/vtmoney.png';
import zalopay from '@/assets/image/zalopay.png';
import atm from '@/assets/image/atm.png';
import creditCard from '@/assets/image/credit-card.png';
import vimomo from '@/assets/image/vimomo.jpg';
import addYellow from '@/assets/svg/addYellow.svg';
import CreditCardModal from '@/components/modals/CreditCardModal';
import { useState } from 'react';
import {
    addOrder,
    createQrOrderZalo,
    setValueMethodPayment,
} from '@/redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import QrPaymentModals from '@/components/modals/QrPaymentModals';
import { Link, useNavigate } from 'react-router-dom';
import OrderCompletedModal from '@/components/modals/OrderCompletedModals';

const methodPayments = [
    {
        title: 'Thanh toán tiền mặt',
        src: cash,
        name: 'payment',
        value: 'cash_on_delivery',
    },
    {
        title: 'Viettel Money',
        src: vtmoney,
        name: 'payment',
        value: 'vt_money',
        type: 'qr',
    },
    {
        title: 'Ví Mono',
        src: vimomo,
        name: 'payment',
        value: 'vi_momo',
        type: 'qr',
    },
    {
        title: 'Zalo pay',
        src: zalopay,
        name: 'payment',
        value: 'zalopay',
        type: 'qr',
    },
    { title: 'Thẻ ATM', src: atm, name: 'payment', value: 'atm_banking' },
    {
        title: 'Thẻ ATM',
        src: creditCard,
        name: 'payment',
        value: 'visa',
        type: 'visa',
    },
];
function MethodPayment() {
    const [showModalCreditCard, setShowModalCreditCard] = useState(false);
    const [showQrPaymentModal, setShowQrPaymentModal] = useState(null);
    const [showOrderCompletedModal, setShowOrderCompletedModal] =
        useState(false);

    const valueMethodPayment = useSelector(
        (state) => state.order?.temporaryOrder.methodPayment
    );
    const fullnameCustomer = useSelector(
        (state) => state.order?.temporaryOrder.valueFormUser.fullname
    );
    const userId = useSelector((state) => state?.auth?.user?.id);
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const cartItems = useSelector((state) => state.cart?.cartItem?.products);
    const temporaryOrder = useSelector((state) => state.order?.temporaryOrder);

    const dispatch = useDispatch();

    const handleShowModalCredit = () => {
        setShowModalCreditCard(true);
    };

    const handleChangePaymentMethod = (e, index, typeMethod) => {
        if (typeMethod === 'qr') {
            const formData = new FormData();
            formData.append('fullname', fullnameCustomer);
            formData.append('totalProductInCart', totalProductInCart);
            formData.append('products', JSON.stringify(cartItems));

            if (e.target.value === 'zalopay') {
                dispatch(createQrOrderZalo(formData));
                setShowQrPaymentModal(index);
            }
        }
        dispatch(setValueMethodPayment(e.target.value));
    };

    const handleCompletedOrder = () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('products', JSON.stringify(cartItems));
        formData.append('totalPrice', totalProductInCart);
        formData.append('province', temporaryOrder?.valueProvince.value);
        formData.append('district', temporaryOrder?.valueDistrict.value);
        formData.append('ward', temporaryOrder?.valueWard.value);
        formData.append('fullname', temporaryOrder?.valueFormUser.fullname);
        formData.append('phone', temporaryOrder?.valueFormUser.phone);
        formData.append(
            'detailedAddress',
            temporaryOrder?.valueFormUser.detailAddress
        );
        formData.append('paymentMethod', temporaryOrder?.methodPayment);

        if (valueMethodPayment === 'cash_on_delivery') {
            //  handle complete order
            dispatch(addOrder(formData)).then((response) => {
                console.log('🚀 ~ dispatch ~ response:', response);
                if (response?.payload.success) {
                    setShowOrderCompletedModal(true);
                } else {
                    setShowOrderCompletedModal(false);
                }
            });
        }
    };

    return (
        <div>
            {/* payment method */}
            <div className="mb-6">
                <div className="font-medium text-xl">
                    Chọn hình thức thanh toán
                </div>
            </div>
            <div className="mb-10">
                {methodPayments.map((methodPayment, index) => (
                    <div key={index}>
                        <label
                            key={index}
                            htmlFor={methodPayment.title}
                            className="flex items-center gap-3 mb-6 cursor-pointer"
                        >
                            <input
                                type="radio"
                                name={methodPayment.name}
                                id={methodPayment.title}
                                className="h-4 w-9 outline-none focus:bg-transparent focus:outline-none focus:shadow-none cursor-pointer"
                                value={methodPayment.value}
                                checked={
                                    valueMethodPayment === methodPayment.value
                                }
                                onChange={(e) => {
                                    handleChangePaymentMethod(
                                        e,
                                        index,
                                        methodPayment.type
                                    );
                                }}
                            />
                            <img
                                src={methodPayment.src}
                                alt=""
                                className="h-9"
                            />
                            <span className="text-sm">
                                {methodPayment.title}
                            </span>
                        </label>
                        {methodPayment.type === 'visa' && (
                            <button
                                onClick={handleShowModalCredit}
                                className="border px-3 py-2 rounded-md text-sm flex items-center gap-2 border-yellow-base text-yellow-base"
                            >
                                <img src={addYellow} alt="" />
                                <span>Thêm thẻ mới</span>
                            </button>
                        )}
                        {showQrPaymentModal === index && (
                            <QrPaymentModals
                                setShowQrPaymentModal={setShowQrPaymentModal}
                                showQrPaymentModal={showQrPaymentModal}
                            />
                        )}
                    </div>
                ))}
                {showModalCreditCard && (
                    <CreditCardModal
                        setShowModalCreditCard={setShowModalCreditCard}
                        showModalCreditCard={showModalCreditCard}
                    />
                )}
            </div>
            <div className="flex justify-between items-center text-sm mb-16">
                <div className="text-yellow-base hover:brightness-110">
                    <Link to="/your-cart">Giỏ hàng</Link>
                </div>
                <button
                    onClick={handleCompletedOrder}
                    type="submit"
                    className="px-4 py-4 bg-yellow-base text-white rounded-sm hover:brightness-110"
                >
                    Hoàn tất đơn hàng
                </button>
            </div>
            {showOrderCompletedModal && (
                <OrderCompletedModal
                    showOrderCompletedModal={showOrderCompletedModal}
                    setShowOrderCompletedModal={setShowOrderCompletedModal}
                />
            )}
            ;
        </div>
    );
}

export default MethodPayment;
