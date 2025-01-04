import { useSelector } from 'react-redux';
import arr_sort from '@/assets/svg/admin/arr_sort.svg';
import arr_sort_white from '@/assets/svg/admin/arr_sort_white.svg';

import FormList from '@/components/admin/FormList';

const categoryListUser = [
    { name: 'Tên KH', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Email', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Số điện thoại', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Ngày', img_white: arr_sort_white, img_black: arr_sort },
];
function Customer() {
    const authRedux = useSelector((state) => state?.auth);

    return (
        <>
            <FormList
                type={'customer'}
                categoryList={categoryListUser}
                stateStore={authRedux}
                stateArr={authRedux?.allUser}
            />
        </>
    );
}

export default Customer;
