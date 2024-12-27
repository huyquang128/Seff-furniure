import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function OutdoorFurniture() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[2].subChildren[0]}
            type={''}
            name={'NỘI THẤT NGOÀI TRỜI'}
            description={`Bạn đang muốn tạo một căn bếp ngoài trời cho các buổi sinh hoạt gia đình và bạn bè? Hãy để chúng tôi giúp bạn thiết kế nhà bếp ngoài trời trong mơ của bạn. Với các sản phẩm nội thất ngoài trời chất lượng cao và bền trong sử dụng, giờ đây bạn có thể tạo ra một không gian vừa tiện dụng vừa đẹp mắt. Vậy tại sao phải chờ đợi? Hãy mua và tạo ra những không gian bếp ngoài trời ngay nhé!`}
        />
    );
}

export default OutdoorFurniture;
