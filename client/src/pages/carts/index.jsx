import ContentCart from '@/components/cart/ContentCart';
import CategoryHome from '@/components/home/CategoryHome';
import FooterHome from '@/components/home/FooterHome';
import HeaderHome from '@/components/home/HeaderHome';
import TopbarHeader from '@/components/home/TopbarHeader';

function Cart() {
    return (
        <div className="w-full">
            <div className="top-0 right-0 left-0 fixed z-20 bg-white">
                <TopbarHeader />
                <HeaderHome />
                <CategoryHome />
            </div>
            <ContentCart />
            <FooterHome />
        </div>
    );
}

export default Cart;
