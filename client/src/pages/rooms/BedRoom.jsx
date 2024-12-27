import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import bedroom_1 from '@/assets/image/bedroom.jpg';

function BedRoom() {
    // const location = useLocation();
    const dispatch = useDispatch();
    // const path = location.pathname.split('/');

    const menuBedRoom = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <>
            <RoomLayoutCommon
                background={bedroom_1}
                menuAndProduct={menuBedRoom && menuBedRoom[1]}
                type={''}
                name={'PHÒNG NGỦ'}
                description={` Tại HOMECOR, chúng tôi mong muốn giúp bạn tạo ra một không
                    gian ngủ hoàn hảo và trọn vẹn nhất. Với các bộ sưu tập đa
                    dạng về giường, nệm, khăn trải giường và các sản phẩm chăn
                    ga gối nệm khác, chúng tôi cam kết mang đến cho bạn những
                    trải nghiệm giấc ngủ thật tuyệt vời.`}
            />
        </>
    );
}

export default BedRoom;
