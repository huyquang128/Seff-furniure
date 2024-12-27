import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function ChestOfDrawers() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[1]}
            type={''}
            name={'TỦ NGĂN KÉO'}
            description={`Nội thất phòng ngủ coi như chưa hoàn thiện nếu không có sự bổ sung của tủ đầu giường. Vì thế, Homecor cung cấp nhiều loại tủ đầu giường đầy phong cách và tiện dụng, hoàn hảo cho bất kỳ thiết kế phòng ngủ nào. Những chiếc tủ này vừa được sử dụng để các vật dụng như đèn, sách và đồng hồ báo thức, vừa có chức năng lưu trữ đồ vật, tiện lợi cho bạn khi sử dụng. Hãy sắm ngay chiếc tủ đầu giường phù hợp với bạn ngay nhé`}
        />
    );
}

export default ChestOfDrawers;
