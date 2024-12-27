import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function ClothesHanger() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[2]}
            type={''}
            name={'GIÁ TREO QUẦN ÁO'}
            description={`Nếu bạn đang tìm kiếm các giải pháp tiết kiệm không gian nhưng tiện ích trong sử dụng cho cả phòng ngủ và tủ quần áo, hãy trải nghiệm ngay những món đồ nội thất bổ sung của Come Home Từ bàn trang điểm, giá để giày, giá treo áo khoác, giá treo mũ và móc áo, tất cả đều có sẵn ở Homecor dành riêng cho không gian của bạn.`}
        />
    );
}

export default ClothesHanger;
