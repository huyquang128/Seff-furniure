import arrow_top from '@/assets/svg/arrow-top.svg';
import { motion } from 'framer-motion';

function FavoriteToolkit({ isOpenTooltipHeart, isShowTooltipAnimation }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: isOpenTooltipHeart && !isShowTooltipAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 translate-y-10 right-5 text-xs z-20 bg-white shadow-model-1 
                        text-black-second rounded-md p-2"
        >
            <div className="relative">
                <img
                    src={arrow_top}
                    alt=""
                    className="absolute top-0 -translate-y-4 right-1/2 translate-x-1/2 "
                />
            </div>
            <div className="">Sản phẩm yêu thích</div>
        </motion.div>
    );
}

export default FavoriteToolkit;
