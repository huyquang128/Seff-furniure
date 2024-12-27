import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function Mattress() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[2]}
            type={'children'}
            name={'NỆM'}
            description={`Hãy để Homecor giúp bạn tận dụng tối đa buổi tối thư giãn hoặc kỳ nghỉ ngắn ngày với các sản phẩm nệm chất lượng cao của chúng tôi. Với các tính năng chống thấm nước, bảo vệ tối đa chống tràn và tai nạn, dễ dàng tháo lắp và vệ sinh, chúng tôi luông hy vọng mang đến những giây phút nghỉ ngơi thoải mái cho bạn.`}
        />
    );
}

export default Mattress;
