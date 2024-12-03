import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TopHeaderModal from '../modals/TopHeaderModal';
import { useSelector } from 'react-redux';

function TopbarHeader() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    const addressStore = useSelector((state) => state?.auth.addressStore);

    return (
        <div className="bg-black-second max-md:hidden">
            <div
                className="max-w-[1440px] mx-auto max-xl:px-[68px] 
                            max-lg:px-3 flex justify-between  
                            text-xs py-2.5 text-white font-medium gap-3"
            >
                <span>
                    Chào mừng bạn đến với HOMECOR - Cửa hàng cung cấp giải pháp
                    trang trí nội thất với mô hình Một điểm đến (One-Stop
                    Shopping) đầu tiên tại Việt Nam!
                </span>
                <div className="flex items-center gap-1 cursor-pointer min-w-14 justify-between">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span onClick={() => setIsShowModal(true)}>
                        {addressStore === 'hn' ? 'Hà Nội' : 'Hồ Chí Minh'}
                    </span>
                </div>
            </div>
            {isShowModal && (
                <TopHeaderModal
                    isShowModal={isShowModal}
                    setIsShowModal={setIsShowModal}
                    isCloseModalAnimation={isCloseModalAnimation}
                    setIsCloseModalAnimation={setIsCloseModalAnimation}
                />
            )}
        </div>
    );
}

export default TopbarHeader;
