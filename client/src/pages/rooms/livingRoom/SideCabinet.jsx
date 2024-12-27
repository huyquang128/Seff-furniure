import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function SideCabinet() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[2].subChildren[4]
            }
            type={''}
            name={'TỦ PHỤ'}
            description={`Chúng tôi hiểu rằng tủ phụ không chỉ là một món đồ nội thất, mà còn là một phần quan trọng trong trang trí không gian sống của bạn. Chính vì vậy, chúng tôi đã tập trung vào việc chọn lựa các thiết kế đẹp mắt, rộng rãi và phong cách để đáp ứng nhu cầu và sở thích của khách hàng. Từ các tủ phụ gỗ tự nhiên tới tủ phụ hiện đại với chất liệu đa dạng như gỗ, kim loại và thủy tinh, chúng tôi sẽ giúp bạn tìm ra lựa chọn phù hợp với phong cách và không gian của bạn.`}
        />
    );
}

export default SideCabinet;
