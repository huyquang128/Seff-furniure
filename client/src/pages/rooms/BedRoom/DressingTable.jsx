import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function DressingTable() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[3]}
            type={'children'}
            name={'BÀN TRANG ĐIỂM'}
            description={`Bàn trang điểm không chỉ là nơi để phái đẹp tô điểm nhan sắc mà còn là đồ nội thất quan trọng góp phần tạo nên sự tinh tế và sang trọng cho không gian phòng ngủ. Xem ngay những mẫu bàn trang điểm đẹp, ấn tượng, hiện đại, được ưa chuộng nhất hiện nay.`}
        />
    );
}

export default DressingTable;
