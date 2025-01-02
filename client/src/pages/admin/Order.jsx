import arr_sort from '@/assets/svg/admin/arr_sort.svg';
import arr_sort_white from '@/assets/svg/admin/arr_sort_white.svg';
import FormList from '@/components/admin/FormList';
import { useSelector } from 'react-redux';

const categoryListOrder = [
    { name: 'Mã ĐH', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Khách hàng', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Đơn hàng', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Ngày', img_white: arr_sort_white, img_black: arr_sort },
    { name: 'Trạng thái', img_white: arr_sort_white, img_black: arr_sort },
];
function Order() {
    const orderRedux = useSelector((state) => state?.order);

    return (
        <>
            <FormList
                type={'orders'}
                categoryList={categoryListOrder}
                stateStore={orderRedux}
                stateArr={orderRedux.orders}
            />
        </>
    );
}

export default Order;
