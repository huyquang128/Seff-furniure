import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function Wardrobe() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[3]}
            type={'children'}
            name={'TỦ QUẦN ÁO'}
            description={`Một tủ quần áo đủ rộng và có nhiều ngăn chứa đồ sẽ giúp bạn tối ưu hóa diện tích trong ngôi nhà. Hãy tham khảo các tủ chứa đồ của Homecor. Quần áo và đồ dùng cá nhân của bạn sẽ được sắp xếp gọn gàng và ngăn nắp.`}
        />
    );
}

export default Wardrobe;
