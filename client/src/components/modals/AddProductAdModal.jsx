import { motion } from 'framer-motion';
import close from '@/assets/svg/close.svg';
import close_white from '@/assets/svg/close_white.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FormCommon from '../common/Form';
import { setFormAddProduct } from '@/redux/productSlice';
import { formAddProduct } from '../config/formConfig';

function AddProductAdModal({ isShowAddProductModal, setIsShowProductModal }) {
    const [isCloseModalAnimation, setIsCloseModalAnimation] = useState(false);

    //state redux
    const themeRedux = useSelector((state) => state.auth.theme);
    const formAddProductInit = useSelector(
        (state) => state.products.formAddProduct
    );

    //handle events
    const handleCloseModal = () => {
        setIsCloseModalAnimation(true);
        setTimeout(() => {
            setIsCloseModalAnimation(false);
            setIsShowProductModal(false);
        }, [300]);
    };

    const onSubmit = () => {};

    return (
        <motion.div className="fixed top-0 bottom-0 right-0 left-0 z-10 flex justify-end bg-models">
            <motion.div
                initial={{ x: 600 }}
                animate={{
                    // opacity:
                    //     isShowAddProductModal && !isCloseModalAnimation ? 1 : 0,
                    x:
                        isShowAddProductModal && !isCloseModalAnimation
                            ? 0
                            : 600,
                }}
                transition={{ duration: 0.3 }}
                className="bg-background w-5/12 h-full max-lg:w-8/12 max-md:w-8/12 max-sm:w-11/12 
                                    px-5 py-4 rounded-md "
            >
                <div className="text-black flex justify-between py-2">
                    <div className="text-text-first">Thêm sản phẩm</div>
                    <img
                        onClick={handleCloseModal}
                        src={themeRedux === 'light' ? close : close_white}
                        alt=""
                        className="cursor-pointer"
                    />
                </div>
                <div className="px-3 hidden-scrollbar-discount-modal h-full pb-5 overflow-y-scroll">
                    <FormCommon
                        form={formAddProductInit}
                        setForm={setFormAddProduct}
                        formController={formAddProduct}
                        buttonText={'Thêm sản phẩm'}
                        onSubmit={onSubmit}
                        type={'addProduct'}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AddProductAdModal;
