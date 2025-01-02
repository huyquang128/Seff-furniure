import FormCommon from '@/components/common/Form';
import { formSettingAdmins } from '@/components/config/formConfig';
import { setFormSettingAdmin } from '@/redux/authSlice';
import { useSelector } from 'react-redux';

function SettingAd() {
    const authRedux = useSelector((state) => state?.auth);

    const onSubmit = () => {};
    return (
        <div className='p-5'>
            <div className='text-text-first text-xl font-medium mb-7'>Cài đặt chung</div>
            <div className=''>
                <FormCommon
                    form={authRedux.formSettingAdmin}
                    setForm={setFormSettingAdmin}
                    formController={formSettingAdmins}
                    buttonText={'Lưu'}
                    onSubmit={onSubmit}
                    type={'setting-admin'}
                />
            </div>
        </div>
    );
}

// form,
// setForm,
// formController,
// buttonText,
// onSubmit,
// type,

export default SettingAd;
