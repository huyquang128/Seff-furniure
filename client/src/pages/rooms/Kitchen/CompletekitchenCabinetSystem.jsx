import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function CompletekitchenCabinetSystem() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[2].subChildren[3]}
            type={''}
            name={'HỆ TỦ BẾP HOÀN CHỈNH'}
            description={`Hệ kệ tủ bếp là một trong những yếu tố quan trọng góp phần tạo nên sự tiện nghi và thẩm mỹ cho không gian bếp`}
        />
    );
}

export default CompletekitchenCabinetSystem;
