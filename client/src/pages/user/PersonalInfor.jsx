import FormCommon from '@/components/common/Form';
import { useDispatch, useSelector } from 'react-redux';
import { formInformationUser } from '@/components/config/formConfig';
import { setFormInfoUser, updateProfile } from '@/redux/authSlice';
import edit from '@/assets/svg/note-edit.svg';
import { useState } from 'react';
import UploadAvatarModal from '@/components/modals/UploadAvatarModal';
import ToastMessage from '@/components/common/ToastMessage';

function PersonalInfor() {
    const dispatch = useDispatch();

    //state redux
    const authSelector = useSelector((state) => state?.auth);
    const urlImgAvatar = useSelector((state) => state?.auth.urlImgAvatar);
    const formInfoUser = useSelector((state) => state?.auth.formInfoUser);

    //state react
    const [isShowUploadAvatar, setIsShowUploadAvatar] = useState(false);
    const [isActive, setIsActive] = useState(1);

    //handle events
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            userId: authSelector.user?.id,
            firstName: formInfoUser.firstName,
            lastName: formInfoUser.lastName,
            phone: formInfoUser.phone,
            email: authSelector.formInfoUser.email,
            detailAddress: formInfoUser.detailAddress,
        };
        dispatch(updateProfile(formData)).then((data) => {
            if (data.success) {
                ToastMessage({
                    message: data.message,
                    position: 'top-center',
                    status: 'success',
                });
            }
        });
    };

    const handleOpenModalUploadAvatar = () => {
        setIsShowUploadAvatar(true);
    };

    return (
        <div className="max-lg:w-8/12 max-md:w-full w-9/12 max-sm:w-full">
            <div
                onClick={handleOpenModalUploadAvatar}
                className="mb-6 w-20 h-20 rounded-full bg-blue-400 flex 
                        justify-center items-center text-white
                        text-2xl relative cursor-pointer "
            >
                {urlImgAvatar ? (
                    <img
                        src={urlImgAvatar}
                        alt=""
                        className="h-20 w-20 object-cover rounded-full"
                    />
                ) : (
                    <span>H</span>
                )}
                <img
                    src={edit}
                    alt=""
                    className="bg-black-text p-1 rounded-md absolute bottom-0 left-14"
                />
            </div>

            <div>
                <FormCommon
                    form={formInfoUser}
                    setForm={setFormInfoUser}
                    formController={formInformationUser}
                    buttonText={'Lưu thông tin'}
                    onSubmit={handleSubmit}
                    type="form-info-user"
                />
            </div>
            {isShowUploadAvatar && (
                <UploadAvatarModal
                    isActive={isActive}
                    setIsActive={setIsActive}
                    isShowUploadAvatar={isShowUploadAvatar}
                    setIsShowUploadAvatar={setIsShowUploadAvatar}
                />
            )}
        </div>
    );
}

export default PersonalInfor;
