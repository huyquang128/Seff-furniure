import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import workroom_1 from '@/assets/image/workplace.jpg';

function WorkRoom() {
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname.split('/');

    const menuWorkplace = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <>
            <RoomLayoutCommon
                background={workroom_1}
                menuAndProduct={menuWorkplace && menuWorkplace[3]}
                type={''}
                name={'PHÒNG LÀM VIỆC'}
                description={` Hãy khám phá những chiếc bàn và ghế tiện ích hay kệ treo
                    tường của HOMECOR sẽ giúp bạn làm việc hiệu quả hoặc giải
                    trí được thoải mái hơn. Sản phẩm của chúng tôi được sản xuất
                    với công nghệ mới nhất và tiên tiến nhất giúp đảm bảo sự
                    thoải mái và hiệu quả sử dụng tối đa. Mua ngay và tận hưởng`}
            />
        </>
    );
}

export default WorkRoom;
