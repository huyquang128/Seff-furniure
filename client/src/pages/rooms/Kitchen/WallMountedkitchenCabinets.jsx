import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function WallMountedkitchenCabinets() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[2].subChildren[1]}
            type={''}
            name={'TỦ BẾP TREO TƯỜNG'}
            description={`Tủ bếp treo tường là giải pháp tối ưu để tăng không gian lưu trữ, mang lại sự tiện nghi cho các căn bếp hiện đại. Thế nhưng để chọn được một mẫu tủ bếp phù hợp với nhu cầu và phong cách thiết kế riêng của ngôi nhà không đơn giản. Come Home sẽ cùng bạn tìm hiểu chi tiết hơn về mẫu tủ kệ treo tường này và những tiêu chí quan trọng để có thể sở hữu một sản phẩm chất lượng cho ngôi nhà của mình!`}
        />
    );
}

export default WallMountedkitchenCabinets;
