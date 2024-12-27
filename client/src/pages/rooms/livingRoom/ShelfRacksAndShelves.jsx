import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function ShelfRacksAndShelves() {
    const dispatch = useDispatch();

    const menuShelf = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={
                menuShelf && menuShelf[0].children[2].subChildren[1]
            }
            type={''}
            name={'GIÁ ĐỠ KỆ & KỆ TREO TƯỜNG'}
            description={`Nếu bạn cần kệ treo tường với móc, kệ treo sách hoặc kệ treo tường có ngăn kéo, chúng tôi sẽ có những lựa chọn phù hợp với mong muốn của bạn. Kệ treo tường với móc có thể hỗ trợ bạn treo chìa khóa, nón, túi xách và các vật dụng khác một cách tiện lợi. Kệ treo sách là một giải pháp thông minh để trưng bày và lưu trữ sách yêu thích của bạn. Còn kệ treo tường có ngăn kéo sẽ giúp bạn tổ chức và giữ gọn gàng những vật dụng nhỏ như bút, sổ tay, hoặc vật phẩm gia đình khác.`}
        />
    );
}

export default ShelfRacksAndShelves;
