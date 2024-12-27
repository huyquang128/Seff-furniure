import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function DiningRoom() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2]}
            type={''}
            name={'PHÒNG ĂN'}
            description={`Với một sự kết hợp độc đáo giữa phong cách cổ điển và hiện đại, chúng tôi mang đến cho bạn một bộ sưu tập bàn ăn đa dạng, phù hợp với không gian và phong cách của ngôi nhà bạn.`}
        />
    );
}

export default DiningRoom;
