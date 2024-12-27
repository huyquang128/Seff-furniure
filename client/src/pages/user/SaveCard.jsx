import addYellow from '@/assets/svg/addYellow.svg';
import CreditCardModal from '@/components/modals/CreditCardModal';
import { useState } from 'react';
import card_yellow from '@/assets/svg/card_yellow.svg';

function SaveCard() {
    const [showModalCreditCard, setShowModalCreditCard] = useState(false);

    const handleShowModalCredit = () => {
        setShowModalCreditCard(true);
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <div>Thẻ thanh toán</div>
                <button
                    onClick={handleShowModalCredit}
                    className="border px-3 py-2 rounded-md text-sm flex items-center gap-2 border-yellow-base text-yellow-base"
                >
                    <img src={addYellow} alt="" />
                    <span>Thêm thẻ mới</span>
                </button>
            </div>
            <div className="w-full col-span-4 bg-orange-100 flex gap-3 p-5 rounded-sm">
                <img src={card_yellow} alt="" className="h-5" />
                <div className="text-yellow-600 text-sm ">
                    Bạn chưa thêm thẻ thanh toán nào.
                </div>
            </div>

            {showModalCreditCard && (
                <CreditCardModal
                    setShowModalCreditCard={setShowModalCreditCard}
                    showModalCreditCard={showModalCreditCard}
                />
            )}
        </div>
    );
}

export default SaveCard;
