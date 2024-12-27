import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import sofa from '@/assets/image/sofa.jpg';

function Sofa() {
    const location = useLocation();
    const dispatch = useDispatch();

    const menuWorkplace = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <>
            <RoomLayoutCommon
                background={sofa}
                menuAndProduct={menuWorkplace && menuWorkplace[0].children[1]}
                type={'children'}
                name={'SOFA'}
                description={`Đến với HOMECOR, bạn có thể lựa chọn đa dạng các dòng ghế
                    sofa tùy theo nhu cầu của mình. Những thiết kế của chúng tôi
                    không chỉ làm nổi bật vẻ đẹp cho phòng khách của bạn mà còn
                    đảm bảo sự thoải mái cho không gian nghỉ ngơi của gia đình
                    bạn.`}
            />
        </>
    );
}

export default Sofa;
