import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function KitchenRoom() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2]}
            type={'children'}
            name={'PHÒNG BẾP'}
            description={`Với sự đa dạng về kiểu dáng và chất lượng, chúng tôi cam kết mang đến cho bạn những sản phẩm đáng tin cậy và phù hợp với nhu cầu của bạn. Bạn có thể tìm thấy đồ nội thất và phụ kiện cho nhà bếp với nhiều kiểu dáng và mức giá tại cửa hàng trực tuyến của chúng tôi. `}
        />
    );
}

export default KitchenRoom;
