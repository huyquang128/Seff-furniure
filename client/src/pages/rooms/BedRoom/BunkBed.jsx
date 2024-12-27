import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function BunkBed() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[1]}
            type={''}
            name={'GIƯỜNG TẦNG'}
            description={`Nếu bạn đang tìm kiếm sự sang trọng và thoải mái cho giấc ngủ, thật là thiết sót nếu bỏ lỡ giường bọc nệm của Homecor. Được thiết kế một các tỉ mỉ để giúp cho giấc ngủ ban đêm của bạn được trọn vẹn nhất, chúng tôi tin rằng giờ đây bạn không còn phải lo lắng đến giấc ngủ nữa. Hãy trải nghiệm ngay nhé.`}
        />
    );
}

export default BunkBed;
