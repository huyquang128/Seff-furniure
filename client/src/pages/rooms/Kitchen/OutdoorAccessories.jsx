import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function OutdoorAccessories() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[3].subChildren[1]}
            type={''}
            name={'PHỤ KIỆN NGOÀI TRỜI'}
            description={`Với các sản phẩm chất lượng từ Homecor, bạn có thể thay đổi hoàn toàn góc nhìn về ngoại thất ngôi nhà của mình. Từ việc trồng cây cho đến việc trang trí, chúng tôi mang đến sự sáng tạo và sự tiện ích cho không gian ngoài trời của bạn. Bạn có thể tạo ra một khu vườn đẹp mắt và tạo điểm nhấn đặc biệt cho sân vườn, tạo không gian thoải mái và thư giãn cho gia đình và bạn bè.`}
        />
    );
}

export default OutdoorAccessories;
