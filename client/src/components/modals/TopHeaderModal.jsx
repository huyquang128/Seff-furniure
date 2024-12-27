import { motion } from 'framer-motion';
import close from '@/assets/svg/close.svg';
import kitchen_1 from '@/assets/image/kitchen-1.jpg';
import { useDispatch } from 'react-redux';
import { setAddressStore } from '@/redux/authSlice';
function TopHeaderModal({
    isShowModal,
    setIsShowModal,
    isCloseModalAnimation,
    setIsCloseModalAnimation,
}) {
    const dispatch = useDispatch();

    const closeModal = () => {
        setIsCloseModalAnimation(true);

        setTimeout(() => {
            setIsShowModal(false);
            setIsCloseModalAnimation(false);
        }, 300);
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: isShowModal && !isCloseModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-20 "
        >
            <motion.div
                className="bg-white flex w-[700px]  max-md:w-8/12 md:h-80 max-sm:w-11/12 
                  rounded-lg relative overflow-hidden shadow-model-1"
            >
                <img src={kitchen_1} alt="" className="w-full object-cover " />
                <div className="w-6/12 pb-7 absolute bg-white h-full right-0 rounded-l-2xl">
                    <div className="flex justify-end px-3 mb-4 pt-3">
                        <img
                            src={close}
                            alt=""
                            className="h-5 cursor-pointer"
                            onClick={closeModal}
                        />
                    </div>
                    <div className="flex flex-col gap-3 px-10">
                        <div className="text-xl font-medium text-black-second">
                            Chào mừng bạn đã đến với
                        </div>
                        <div className="font-medium text-yellow-base text-3xl">
                            HOMECOR.
                        </div>
                        <div className="text-xs text-gray-600">
                            Để xem các được các sản phẩm có sẵn ở nơi bạn ở hoặc
                            nơi giao hàng, xin vui lòng chọn địa điểm.
                        </div>
                        <select
                            name=""
                            id=""
                            className="w-full p-3 rounded-lg  text-sm text-gray-500 mb-5"
                            onChange={(e) =>
                                dispatch(setAddressStore(e.target.value))
                            }
                        >
                            <option value="">Tỉnh Thành / Phố</option>
                            <option value="hn">Hà Nội</option>
                            <option value="hcm">Hồ Chí Minh</option>
                        </select>
                        <button
                            onClick={closeModal}
                            className="bg-red-700 border hover:bg-white hover:text-red-700 hover:border 
                                        hover:border-red-700 text-sm w-full rounded-full text-white py-3
                                        font-medium transition-color ease-in-out duration-300"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default TopHeaderModal;
