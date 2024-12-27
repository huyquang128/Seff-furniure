import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import livingroom_1 from '@/assets/image/livingroom-1.jpg';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';

function LivingInteriorRoom() {
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname.split('/');

    const menuWorkplace = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <>
            <RoomLayoutCommon
                background={livingroom_1}
                menuAndProduct={menuWorkplace && menuWorkplace[0].children[0]}
                type={'children'}
                name={'NỘI THẤT PHÒNG KHÁCH'}
                description={` Nội thất phòng khách Nội thất phòng khách: Hãy tạo cho mình
                    một không gian phòng khách thoải mái và thư giãn bằng những
                    đồ nội thất độc đáo của HOMECOR. Bạn có thể mua sắm bất kì
                    món nội thất nào, từ ghế đôn, ghế bành đến bàn cà phê, bàn
                    góc. Các sản phẩm đều được thiết kế hiện đại và đẹp mắt, phù
                    hợp với các nhu cầu của bạn.`}
            />
        </>
    );
}

export default LivingInteriorRoom;
