import { motion } from 'framer-motion';
import close from '@/assets/svg/close.svg';

function AddProductAd() {
    return (
        <motion.div
            // initial={{ opacity: 0 }}
            // // animate={{
            // //     opacity: isShowAddNewAddress && !isCloseModalAnimation ? 1 : 0,
            // // }}
            // transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 left-0  bg-models"
        >
            <motion.div className="bg-white w-6/12 h-full max-md:w-8/12 max-sm:w-11/12 px-5 py-4 rounded-md ">
                <div className="text-black flex justify-between">
                    <div>Thêm sản phẩm</div>
                    <img src={close} alt="" />
                </div>
                <div>
                    
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AddProductAd;
