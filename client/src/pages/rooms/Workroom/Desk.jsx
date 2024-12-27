import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function Desk() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[3].children[0].subChildren[0]}
            type={''}
            name={'BÀN LÀM VIỆC'}
            description={`Bạn đang tìm cách tạo ra một môi trường làm việc hiệu quả hơn trong văn phòng tại nhà của mình? Các sản phẩm bàn làm việc tại nhà của chúng tôi được thiết kế để giúp bạn tổ chức không gian làm việc và tăng năng suất. Hãy tạo nên một không gian làm việc hiệu quả ngay nhé!`}
        />
    );
}

export default Desk;
