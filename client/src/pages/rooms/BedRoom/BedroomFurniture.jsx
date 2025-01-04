import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import bedroom_1 from '@/assets/image/bedroom.jpg';
import shelf from '@/assets/image/shelf.jpg';

function BedroomFurniture() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={bedroom_1}
            menuAndProduct={menuBed && menuBed[1].children[1]}
            type={'children'}
            name={'NỘI THẤT PHÒNG NGỦ'}
            description={`Hãy biến phòng ngủ của bạn thành một nơi thật sự thoải mái và thư giãn bằng những bộ sưu tập nội thất phòng ngủ tinh tế và độc đáo của chúng tôi. Được thiết kế đặc biệt, các nội thất phòng ngủ không những tăng vẻ đẹp cho phòng ngủ của bạn đồng thời giúp cho không gian trở nên thoải mái. Cho dù bạn đang tìm kiếm một chiếc bàn cạnh giường đầy phong cách hay một chiếc tủ ngăn kéo rộng rãi, thì chắc chắn bạn đã đến đúng nơi. Hãy trải nghiệm và tận hưởng không gian ngủ của bạn.`}
        />
    );
}

export default BedroomFurniture;
