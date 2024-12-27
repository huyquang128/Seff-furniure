import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function BedsideCabinet() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[1].children[1].subChildren[0]}
            type={'children'}
            name={'TỦ ĐẦU GIƯỜNG'}
            description={`Tủ đầu giường ngủ là một phần thiết yếu của bất kỳ phòng ngủ nào. Một tủ đầu giường bằng kính cường lực hoặc một ngăn kéo có con lăn đóng êm và êm ái được bao gồm. Bạn có thể đặt chân lên với một tách cà phê espresso hoặc một chiếc đèn thời trang trên mặt bàn, và những thứ cần thiết của bạn có thể được cất trong các ngăn kéo bên dưới.`}
        />
    );
}

export default BedsideCabinet;
