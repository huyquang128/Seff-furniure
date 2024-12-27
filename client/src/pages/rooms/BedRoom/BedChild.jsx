import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function BedChild() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[0]}
            type={'children'}
            name={'GIƯỜNG'}
            description={`Đến với Homecor, bạn có thể lựa chọn những chiếc giường đơn hay giường đôi tùy theo nhu cầu của mình. Những thiết kế của chúng tôi không chỉ làm nổi bật vẻ đẹp cho phòng ngủ của bạn mà còn đảm bảo một giấc ngủ chất lượng. Với sự đa dạng về kích thước và màu sắc, Come Home chắc chắn sẽ giúp bạn tìm được chiếc giường ưng ý.`}
        />
    );
}

export default BedChild;
