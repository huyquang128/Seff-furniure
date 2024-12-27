import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function StorageCabinet() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[2].subChildren[3]
            }
            type={''}
            name={'TỦ LƯU TRỮ'}
            description={`Hãy khám phá lựa chọn đầy phong cách về tủ một mảnh thanh lịch của chúng tôi ngay hôm nay. Những giải pháp lưu trữ tuyệt đẹp này sẽ mang đến một cú nhấp mạnh cho diện mạo của ngôi nhà bạn. Hãy tìm hiểu thêm về những chiếc tủ đơn tuyệt đẹp mà chúng tôi cung cấp và cách chúng có thể thay đổi không gian và tạo ấn tượng đặc biệt cho bất kỳ căn phòng nào.`}
        />
    );
}

export default StorageCabinet;
