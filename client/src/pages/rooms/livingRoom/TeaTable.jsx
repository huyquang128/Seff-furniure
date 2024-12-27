import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function TeaTable() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[0].subChildren[2]
            }
            type={''}
            name={'BÀN TRÀ'}
            description={`Một chiếc bàn sofa không chỉ có thể mang lại vẻ đẹp mắt mà còn rất hữu ích không chỉ trong không gian phía sau ghế dài. 
                        Nếu không gian sàn nhà hạn chế, bàn sofa có thể được sử dụng như một bàn tiệc nhỏ, bàn tạo điểm nhấn, 
                        bàn làm việc, bàn trang điểm, kệ tivi và nhiều mục đích sử dụng khác. Chúng có thể tận dụng không gian một cách hiệu quả và đa năng.`}
        />
    );
}

export default TeaTable;
