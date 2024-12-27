import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function BanhChair() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[0].subChildren[1]
            }
            type={''}
            name={'GHẾ BÀNH'}
            description={`Sau một ngày dài, không gì tuyệt vời hơn khi được thả lỏng chân lên một chiếc ghế đẩu đẹp và hiện đại tại sự thoải mái của ngôi nhà. Hãy làm cho ghế dài hoặc ghế bành của bạn thêm hoàn hảo bằng việc thêm một chỗ để chân. Tính linh hoạt của sản phẩm Come Home mở ra nhiều khả năng, cho phép nó phục vụ như một chiếc ghế đẩu tiện lợi hoặc một chỗ ngồi xinh xắn cho các vị khách nhỏ của chúng tôi.`}
        />
    );
}

export default BanhChair;
