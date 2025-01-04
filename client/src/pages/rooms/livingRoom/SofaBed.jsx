import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import living_1 from '@/assets/image/room-living-1.jpeg';


function SofaBed() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={living_1}
            menuAndProduct={
                menuShelf && menuShelf[0].children[1].subChildren[1]
            }
            type={''}
            name={'SOFA GIƯỜNG'}
            description={`Sofa giường tại Homecor là lựa chọn hoàn hảo cho không gian sống của bạn. Với thiết kế thông minh, các mẫu sofa giường không chỉ đơn giản là một chiếc ghế sofa mà còn có thể dễ dàng biến thành một chiếc giường êm ái, phục vụ nhu cầu ngủ nghỉ một cách linh hoạt. Được chế tác từ những vật liệu cao cấp và đảm bảo tính thẩm mỹ, các mẫu sofa giường tại Come Home mang đến 
            sự thoải mái tối đa và đem lại giá trị sử dụng lâu dài cho gia đình bạn. `}
        />
    );
}

export default SofaBed;
