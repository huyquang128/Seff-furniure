import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import workroom_1 from '@/assets/image/kitchen.jpg';

function KitchenRoom() {
    const location = useLocation();
    const dispatch = useDispatch();
    // const path = location.pathname.split('/');

    const menuBedRoom = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <>
            <RoomLayoutCommon
                background={workroom_1}
                menuAndProduct={menuBedRoom && menuBedRoom[2]}
                type={''}
                name={'PHÒNG BẾP & PHÒNG ĂN'}
                description={` Tại HOMECOR, chúng tôi hiểu rằng phòng ăn là nơi lưu giữ kỷ
                    niệm gia đình. Chính vì vậy, chúng tôi tập trung vào việc
                    cung cấp đa dạng các lựa chọn để giúp bạn tạo ra trải nghiệm
                    ăn uống hoàn hảo, phù hợp với phong cách và sở thích riêng
                    của gia đình bạn.`}
            />
        </>
    );
}

export default KitchenRoom;
