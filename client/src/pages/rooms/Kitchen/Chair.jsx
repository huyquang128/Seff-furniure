import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function Chair() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[1].subChildren[0]}
            type={''}
            name={'GHẾ'}
            description={`Khi chọn những chiếc ghế tốt và phù hợp nhất cho bàn ăn của bạn, điều quan trọng là phải xem xét phong cách của chiếc bàn đó. Cho dù đó là bàn ăn cổ điển, hiện đại hay thanh lịch, bạn sẽ muốn tìm một kiểu dáng ghế phù hợp.`}
        />
    );
}

export default Chair;
