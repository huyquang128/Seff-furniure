/* eslint-disable react/prop-types */
import close from '@/assets/svg/close.svg';
import edit from '@/assets/svg/edit.svg';
import edit_blue from '@/assets/svg/edit-blue.svg';
import frame from '@/assets/svg/frame.svg';
import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import add from '@/assets/svg/add.svg';
import minus from '@/assets/svg/minus.svg';
import frame_blue from '@/assets/svg/frame-blue.svg';
import img_load from '@/assets/svg/img-load.svg';
import img_load_blue from '@/assets/svg/img-load-blue.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setUrlImageAvatar, uploadAvatar } from '@/redux/authSlice';
import { motion } from 'framer-motion';

function UploadAvatarModal({
    isActive,
    setIsActive,
    isShowUploadAvatar,
    setIsShowUploadAvatar,
}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [isModalUploadAvatarAnimation, setIsModalUploadAvatarAnimation] =
        useState(false);

    const urlImgAvatar = useSelector((state) => state?.auth.urlImgAvatar);
    const userId = useSelector((state) => state?.auth.user.id);

    const dispatch = useDispatch();

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        // update crop (tọa độ và kích thước vùng cắt)
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        // convert to file URL(base64)
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setUrlImageAvatar(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    const getCroppedImage = (imageSrc, cropArea) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = cropArea.width;
                canvas.height = cropArea.height;

                // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                //sx, sy : Tọa độ góc của vùng ảnh nguồn được cắt
                //dx, dy: tọa dộ góc của vùng canvas ảnh được vẽ
                ctx.drawImage(
                    image,
                    cropArea.x,
                    cropArea.y,
                    cropArea.width,
                    cropArea.height,
                    0,
                    0,
                    cropArea.width,
                    cropArea.height
                );

                canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty!'));
                        return;
                    }
                    const croppedImgUrl = URL.createObjectURL(blob);
                    console.log(
                        '🚀 ~ canvas.toBlob ~ croppedImgUrl:',
                        croppedImgUrl
                    );

                    resolve(croppedImgUrl);
                }, 'image/ipeg');
            };

            image.onerror = () => reject(new Error('Failed to load image'));
        });
    };

    const handleZoomIn = () => {
        setZoom((pre) => {
            if (pre < 3) {
                return pre + 0.3;
            }
            return 3;
        });
    };

    const handleZoomOut = () => {
        setZoom((pre) => {
            if (pre > 1) {
                return pre - 0.3;
            }
            return 1;
        });
    };

    const handleCloseModalUploadAvatar = () => {
        setIsModalUploadAvatarAnimation(true);

        setTimeout(() => {
            setIsModalUploadAvatarAnimation(false);
            setIsShowUploadAvatar(false);
        }, 400);
    };

    const handleSaveCroppedImage = () => {
        const handleCrop = async () => {
            try {
                const croppedImage = await getCroppedImage(
                    urlImgAvatar,
                    croppedAreaPixels
                );
                console.log('🚀 ~ handleCrop ~ croppedImage:', croppedImage);

                if (croppedImage) {
                    const response = await fetch(croppedImage);
                    const blob = await response.blob();

                    const formData = {
                        userId,
                        avatar: blob,
                    };
                    dispatch(setUrlImageAvatar(croppedImage));
                    dispatch(uploadAvatar(formData));
                    handleCloseModalUploadAvatar();
                }
            } catch (error) {
                console.error(error);
            }
        };

        handleCrop();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity:
                    isShowUploadAvatar && !isModalUploadAvatarAnimation ? 1 : 0,
            }}
            className="fixed top-0 right-0 left-0 bottom-0 z-30 bg-models flex justify-center items-center"
        >
            <div className="w-6/12 max-lg:w-7/12 max-md:w-9/12 max-sm:w-11/12 bg-white rounded-lg">
                <div className="flex justify-between mb-3 p-4 text-xl font-semibold py-3 border-b border-gray-100">
                    <div className="w-full text-center ml-8">
                        Chọn ảnh đại diện
                    </div>
                    <img
                        src={close}
                        alt=""
                        className="cursor-pointer p-0.5 rounded-full bg-gray-200"
                        onClick={handleCloseModalUploadAvatar}
                    />
                </div>
                <div className="flex gap-3 text-sm px-4 mb-5">
                    <div
                        onClick={() => setIsActive(1)}
                        className={`${
                            isActive === 1
                                ? 'bg-bg-blue text-text-blue'
                                : 'bg-gray-300'
                        } flex w-6/12 justify-center gap-2 py-2  rounded-sm cursor-pointer`}
                    >
                        <img
                            src={isActive === 1 ? edit_blue : edit}
                            alt=""
                            className="w-3"
                        />
                        Chỉnh sửa ảnh
                    </div>
                    <div
                        onClick={() => setIsActive(2)}
                        className={`${
                            isActive === 2
                                ? 'bg-bg-blue text-text-blue'
                                : 'bg-gray-300'
                        } flex w-6/12 justify-center gap-2 py-2  rounded-sm cursor-pointer`}
                    >
                        <img
                            src={isActive === 2 ? frame_blue : frame}
                            alt=""
                            className="h-4 -rotate-12 mt-0.5"
                        />
                        Thêm khung
                    </div>
                </div>
                <div className={`relative ${urlImgAvatar ? 'mb-16' : ''} h-96`}>
                    {isActive === 1 ? (
                        urlImgAvatar ? (
                            <>
                                <div className="rounded-full w-2/3">
                                    <Cropper
                                        image={urlImgAvatar}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                        cropSize={{ width: 350, height: 350 }}
                                        cropShape="round"
                                    />
                                </div>
                                <div className=" items-center absolute gap-2 top-[390px] border-b py-2 cursor-pointer flex right-0 left-0 justify-center">
                                    <img
                                        src={minus}
                                        alt=""
                                        onClick={handleZoomOut}
                                    />
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => {
                                            setZoom(e.target.value);
                                        }}
                                        className="w-6/12 h-1 range-avatar"
                                    />
                                    <img
                                        src={add}
                                        alt=""
                                        onClick={handleZoomIn}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center">
                                <label
                                    htmlFor="custom-file-info-user"
                                    className="border-2 w-9/12 h-80 flex flex-col justify-center 
                                                items-center gap-5 border-dashed cursor-pointer"
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        name=""
                                        id="custom-file-info-user"
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                    <img
                                        src={img_load}
                                        alt=""
                                        className="text-center inline-block w-10"
                                    />
                                    <div>Chọn ảnh để làm ảnh đại diện</div>
                                </label>
                            </div>
                        )
                    ) : (
                        <div>Thêm khung ảnh</div>
                    )}
                </div>
                <div
                    className={`mb-5 px-4 flex items-center ${
                        urlImgAvatar ? 'justify-between' : 'justify-end'
                    }`}
                >
                    {urlImgAvatar && (
                        <label
                            htmlFor="custom-file-info-user"
                            className="text-sm flex items-center cursor-pointer hover:brightness-105"
                        >
                            <img
                                src={img_load_blue}
                                alt=""
                                className="text-center inline-block w-5 mr-2"
                            />
                            <input
                                type="file"
                                className="hidden"
                                name=""
                                id="custom-file-info-user"
                                onChange={(e) => handleChangeFile(e)}
                            />
                            <div className="text-blue-500">chọn ảnh khác</div>
                        </label>
                    )}

                    <div className=" flex justify-end gap-3 ">
                        <button
                            onClick={handleCloseModalUploadAvatar}
                            className="text-blue-500 text-sm border border-blue-500 rounded-sm px-7 py-1"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSaveCroppedImage}
                            className="text-white text-sm bg-blue-500 rounded-sm px-7 py-2"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default UploadAvatarModal;
