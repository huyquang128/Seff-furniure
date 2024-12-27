import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductFromLivingRoom } from '@/redux/productSlice';
import RoomLayoutCommon from '@/components/Room/RoomLayoutCommon';
import shelf from '@/assets/image/shelf.jpg';

function HomeOffice() {
    const dispatch = useDispatch();

    const menuBed = useSelector((state) => state?.menuNav?.menuNav);

    useEffect(() => {
        dispatch(getAllProductFromLivingRoom());
    }, [dispatch]);

    return (
        <RoomLayoutCommon
            background={shelf}
            menuAndProduct={menuBed && menuBed[3].children[0]}
            type={'children'}
            name={'PHÒNG LÀM VIỆC TẠI NHÀ'}
            description={`Chúng tôi luôn cung cấp các giải pháp văn phòng làm việc tại nhà, giúp tạo ra các không gian làm việc hiệu quả và riêng tư. Đến với Come Home, bạn sẽ tìm thấy nhiều loại nội thất văn phòng phù hợp với nhu cầu của mình, bao gồm ghế, bàn làm việc và các giải pháp lưu trữ. Hãy dành thời gian khám phá phạm vi sản phẩm của chúng tôi và tìm ra sản phẩm phù hợp nhất với nhu cầu của bạn nhé!`}
        />
    );
}

export default HomeOffice;
