import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function BookShelf() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[2].subChildren[0]
            }
            type={''}
            name={'KỆ SÁCH'}
            description={`Chúng tôi hiểu rằng tủ sách không chỉ là một món đồ nội thất, mà còn là một phần quan trọng trong trang trí và tổ chức không gian sống. Chính vì vậy, chúng tôi đã chọn những tủ sách được thiết kế đẹp mắt và chất lượng, để đảm bảo rằng chúng phù hợp với không gian và phong cách của căn hộ. Bằng cách tận dụng không gian trống gần ghế dài, tủ sách không chỉ là một vật dụng hữu ích mà còn là một phần của trải nghiệm sống của bạn. `}
        />
    );
}

export default BookShelf;
