import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';
import bedroom_1 from '@/assets/image/bedroom.jpg';

function DrawersUnderBed() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={bedroom_1}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[2]}
            type={''}
            name={'NGĂN KÉO GẦM GIƯỜNG'}
            description={`Mỗi khi cần một món đồ nội thất phòng ngủ riêng lẻ hay chỉ cần thay thế các phần của nội thất đã bị hư hỏng, bạn chỉ cần đến Homecor. Bạn không cần phải mua nguyên bộ sản phẩm, mà thay vào đó bạn có thể dễ dàng mua các sản phẩm riêng lẻ, phù hợp với nhu cầu như màn che giường, đầu giường, gầm giường có ngăn chứa đồ, khung giường hoặc hộp đựng đồ.`}
        />
    );
}

export default DrawersUnderBed;
