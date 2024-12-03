/* eslint-disable react/prop-types */
import { QRCodeSVG } from 'qrcode.react';
import vimomo from '@/assets/image/vimomo.jpg';
import zalopay from '@/assets/image/zalopay.png';
import vtmoney from '@/assets/image/vtmoney.png';
import qr1 from '@/assets/svg/qr1.svg';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function QrPaymentModals({ setShowQrPaymentModal, showQrPaymentModal }) {
    const qrCodeZalo = useSelector((state) => state.order?.qrCodeZalo);
    const [time, setTime] = useState(299);
    const [isRunning, setIsRunning] = useState(true);
    const [isShowQrModal, setIsShowQrModal] = useState(true);
    const totalProductInCart = useSelector(
        (state) => state.cart?.totalProductInCart
    );
    const [isQrModalAnimation, setIsQrModalAnimation] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (time === 0) {
            clearInterval(interval);
            setShowQrPaymentModal(null);
        }

        return () => clearInterval(interval);
    }, [isRunning, time, setShowQrPaymentModal]);

    //convert time milliseconds to minutes
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const handleCloseQrModal = () => {
        setIsQrModalAnimation(true);

        setTimeout(() => {
            setIsQrModalAnimation(false);
            setShowQrPaymentModal(null);
        }, 400);
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: showQrPaymentModal && !isQrModalAnimation ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-models z-30 "
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: showQrPaymentModal && !isQrModalAnimation ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="bg-white w-[700px] max-md:w-8/12 max-sm:w-10/12 max-md:h-auto h-96 rounded-2xl"
            >
                {/* qr code */}
                <div
                    className="flex justify-between px-5 py-3 items-center border-b 
                                border-gray-100"
                >
                    <div className="flex gap-1 items-center">
                        <img
                            src={zalopay}
                            alt=""
                            className="h-7 border rounded-lg"
                        />
                        <h3 className="font-medium max-md:hidden">
                            Thanh toán bằng
                        </h3>
                        <div className="font-medium text-gray-600 ml-1">
                            Zalopay
                        </div>
                    </div>
                    <div
                        onClick={handleCloseQrModal}
                        className="text-sm text-text-blue hover:brightness-110 cursor-pointer"
                    >
                        Đổi phương thức khác
                    </div>
                </div>

                <div className="flex max-md:flex-col px-5 gap-5 py-5 items-center">
                    {/* qr code */}
                    <div className="w-5/12 max-md:w-8/12 max-md:min-w-[270px] p-4 bg-white-second flex flex-col items-center gap-3 justify-between rounded-2xl">
                        <div className="p-4 bg-white rounded-2xl shadow-qr-code">
                            <QRCodeSVG value={qrCodeZalo} size={200} />
                        </div>
                        <div className="flex gap-10">
                            <div className="text-text-gray">Tổng tiền: </div>
                            <div className="min-w-28 text-end">
                                {totalProductInCart.toLocaleString('vn-VN')} ₫
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="w-7/12">
                        <h3 className="font-medium mb-5 max-md:hidden">
                            Quét mã QR để thanh toán
                        </h3>
                        <div className="flex text-sm items-center gap-2 mb-4 max-md:hidden">
                            <span className="bg-blue-500 rounded-full px-1.5 py-[1px] text-white text-xs">
                                1
                            </span>
                            <div className="text-text-gray">
                                Mở ứng dụng VNPQY-QR trên điện thoại
                            </div>
                        </div>
                        <div className="flex text-sm items-center gap-2 mb-4 max-md:hidden">
                            <span className="bg-blue-500 rounded-full px-1.5 py-[1px] text-white text-xs">
                                2
                            </span>
                            <div className="flex gap-2 text-text-gray">
                                Trên ZALOPAY, chọn biểu tượng
                                <img src={qr1} alt="" className="h-5" />
                                quét mã QR
                            </div>
                        </div>
                        <div className="flex text-sm items-center gap-2 mb-16 max-md:hidden">
                            <span className="bg-blue-500 rounded-full px-1.5 py-[1px] text-white text-xs">
                                3
                            </span>
                            <div className="text-text-gray ">
                                Quét mã QR ở trang này để thanh toán
                            </div>
                        </div>
                        <div className="px-3 bg-orange-100 rounded-md max-md:px-4 text-white py-3">
                            <div className="text-center text-sm mb-3 text-yellow-base">
                                Giao dịch kết thúc sau
                            </div>
                            <div className="flex items-center gap-3 justify-center">
                                <span className="bg-orange-500 px-1.5 rounded-sm min-w-[30px]">
                                    {String(minutes).padStart(2, '0')}
                                </span>
                                <span className="text-yellow-base">:</span>
                                <span className="bg-orange-500 px-1.5 rounded-sm min-w-[30px]">
                                    {String(seconds).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default QrPaymentModals;
