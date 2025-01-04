import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';
import bedroom_1 from '@/assets/image/bedroom.jpg';

function MattressSubChildren() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={bedroom_1}
            menuAndProduct={menuBed && menuBed[1].children[2].subChildren[0]}
            type={''}
            name={'NỆM'}
            description={`Homecor giới thiệu đến bạn đa dạng loại nệm. Từ nệm cao su, nệm lò xo, nệm mút, nệm gập các sản phẩm đều được thiết kế để mang lại cho bạn giấc ngủ thoải mái và thư giản cho cơ thể.`}
        />
    );
}

export default MattressSubChildren;
