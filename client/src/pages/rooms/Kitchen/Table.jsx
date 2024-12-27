import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function Table() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[1].subChildren[1]}
            type={''}
            name={'BÀN'}
            description={`Với các thiết kế tinh tế và độc đáo, bộ sư tập bàn ăn của Homecor sẽ mang đến cho bạn những lựa chọn tối ưu và phù hợp nhất với không gian bếp của bạn. Bàn ăn của Come Home có thể dễ dàng thu hẹp hoặc mở rộng, đảm bảo sẽ giúp bạn có những giây phút vô cùng sảng khoái cùng gia đình và bạn bè.`}
        />
    );
}

export default Table;
