import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import living_1 from '@/assets/image/room-living-1.jpeg';


function SofaChild() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={living_1}
            menuAndProduct={
                menuShelf && menuShelf[0].children[1].subChildren[0]
            }
            type={''}
            name={'SOFA'}
            description={`Ghế sofa đóng vai trò vô cùng quan trọng trong phòng khách, không chỉ mang đến sự tiện nghi, thoải mái mà còn góp phần tạo nên vẻ đẹp thẩm mỹ cho không gian. `}
        />
    );
}

export default SofaChild;
