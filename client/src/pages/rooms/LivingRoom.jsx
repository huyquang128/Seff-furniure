import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import living_1 from '@/assets/image/room-living-1.jpeg';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
function LivingRoom() {
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname.split('/');

    const menuLiving = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <>
            <RoomLayoutCommon
                background={living_1}
                menuAndProduct={menuLiving && menuLiving[0]}
                type={''}
                name={'PHÒNG KHÁCH'}
                description={`  Tại Come Home, chúng tôi mong muốn giúp bạn tạo ra một không
                       gian ngủ hoàn hảo và trọn vẹn nhất. Với các bộ sưu tập đa
                        dạng về giường, nệm, khăn trải giường và các sản phẩm chăn
                      ga gối nệm khác, chúng tôi cam kết mang đến cho bạn những
                        trải nghiệm giấc ngủ thật tuyệt vời.`}
            />
        </>
    );
}

export default LivingRoom;
