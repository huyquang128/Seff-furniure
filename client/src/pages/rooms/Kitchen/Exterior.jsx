import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function Exterior() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[2].children[3]}
            type={'children'}
            name={'NGOẠI THẤT'}
            description={`Với một chút sáng tạo, bạn có biến sân sau của mình thành một không gian ăn uống ngoài trời tuyệt vời. Với Come Home, chúng tôi sẽ giúp bạn thưởng thức một bữa ăn ngon trong không khí trong lành và hòa mình vào vẻ đẹp của thiên nhiên. `}
        />
    );
}

export default Exterior;
