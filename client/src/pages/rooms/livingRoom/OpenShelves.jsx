import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function OpenShelves() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[2].subChildren[2]
            }
            type={''}
            name={'KỆ TỦ MỞ'}
            description={`Thay vì tủ sách tiêu chuẩn, hãy xem xét sử dụng một trong những đơn vị giá đỡ mô-đun tuyệt vời của chúng tôi. Chúng sẽ mang đến sự đa dạng và tính năng đặc biệt cho không gian của bạn. Bạn có thể lựa chọn kệ hình khối hoặc tủ sách có bàn làm việc tích hợp, tận dụng không gian một cách hiệu quả.`}
        />
    );
}

export default OpenShelves;
