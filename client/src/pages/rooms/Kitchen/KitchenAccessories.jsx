import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function KitchenAccessories() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[0].subChildren[0]}
            type={''}
            name={'PHỤ KIỆN BẾP'}
            description={`Cho dù nhà bếp của bạn theo phong cách hiện đại hay đơn giản, thì có rất nhiều đồ dùng nhà bếp thiết yếu mà bạn không thể thiếu khi chuẩn bị những bữa ăn ngon. Hãy để Homecor cung cấp mọi phụ kiện bếp mà bạn cần để giúp bạn có thể sáng tạo những món ăn ngon và yêu thích cho gia đình bạn.`}
        />
    );
}

export default KitchenAccessories;
