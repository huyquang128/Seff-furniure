import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function OpenWardrobe() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[2].subChildren[0]}
            type={''}
            name={'TỦ QUẦN ÁO CÁNH MỞ'}
            description={`Tủ quần áo là sản phẩm nội thất thiết yếu của mỗi gia đình, dùng để lưu trữ, bảo quản quần áo và các vật dụng cần thiết khác. Trong đó, tủ quần áo cánh mở là mẫu tủ được ưa chuộng bởi sự tiện lợi, dễ sử dụng và tính thẩm mỹ cao. Xem ngay những mẫu tủ quần áo cánh mở đẹp, hiện đại, ấn tượng nhất hiện nay`}
        />
    );
}

export default OpenWardrobe;
