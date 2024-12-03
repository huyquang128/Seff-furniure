import CategoryHome from '@/components/home/CategoryHome';
import FooterHome from '@/components/home/FooterHome';
import HeaderHome from '@/components/home/HeaderHome';
import TopbarHeader from '@/components/home/TopbarHeader';
import ContentProductDetail from '@/components/product/ContentProductDetail';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { productName } = useParams();
    const dispatch = useDispatch();
    return (
        <div className="w-full">
            <div className="top-0 right-0 left-0 fixed z-20 bg-white">
                <TopbarHeader />
                <HeaderHome />
                <CategoryHome />
            </div>
            <ContentProductDetail productName={productName} />
            <FooterHome />
        </div>
    );
}

export default ProductDetail;
