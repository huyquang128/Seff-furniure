import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import living_1 from '@/assets/image/room-living-1.jpeg';

function Shelf() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={living_1}
            menuAndProduct={menuShelf && menuShelf[0].children[2]}
            type={'children'}
            name={'KỆ TỦ LƯU TRỮ'}
            description={`Kệ tủ, kệ sách là một trong những giải pháp thông minh và hữu hiệu vừa để 
                    lưu trữ các món đồ yêu thích, lại vừa tiết kiệm diện tích và làm cho không gian 
                    sống trở nên thú vị hơn. Hãy đến với Homecor để mang về những chiếc kệ tủ hoặc kệ 
                    sách phù hợp với không gian sống của bạn nhé.`}
        />
    );
}

export default Shelf;
