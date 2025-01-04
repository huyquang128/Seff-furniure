import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import bedroom_1 from '@/assets/image/bedroom.jpg';
import shelf from '@/assets/image/shelf.jpg';

function BedFrame() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={bedroom_1}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[0]}
            type={''}
            name={'KHUNG GIƯỜNG'}
            description={`Trải nghiệm sự thoải mái và sang trọng tối đa với bộ sưu tập khung giường của Come Homecor. Các thiết kế đặc sắc, các khung giường của chúng tôi mang lại trải nghiệm ngủ ấm cúng và thoải mái, đồng thời tăng thêm nét sang trọng cho phòng ngủ của bạn.`}
        />
    );
}

export default BedFrame;
