import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import workroom_1 from '@/assets/image/workplace.jpg';

function DeskCabinet() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={workroom_1}
            menuAndProduct={menuBed && menuBed[3].children[0].subChildren[1]}
            type={''}
            name={'TỦ BÀN LÀM VIỆC'}
            description={`Đầu tư vào một chiếc bàn làm việc có ngăn kéo là một lựa chọn thông minh cho bất kỳ không gian văn phòng nào. Điều này không chỉ giúp giữ cho không gian làm việc của bạn gọn gàng mà còn tăng năng suất bằng cách giảm thời gian tìm kiếm các đồ vật. Với Come Home, bàn làm việc của chúng tôi được chế tác từ những chất liệu cao cấp như MFC, MDF và có một ngăn kéo tiện lợi, sẽ giúp không gian làm việc của bạn trở nên tinh tế hơn.`}
        />
    );
}

export default DeskCabinet;
