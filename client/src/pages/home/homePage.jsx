import HotItems from '@/components/home/HotItems';
import InfoHot from '@/components/home/InfoHot';
import IntroductionHome from '@/components/home/IntroductionHome';
import Notification from '@/components/home/Notification';
import ProductDiscovery from '@/components/home/ProductDiscovery';
import SliderShow from '@/components/home/SliderShow';

function HomePage() {
    return (
        <div className="w-full">
            <SliderShow />
            <Notification />
            <IntroductionHome />
            <ProductDiscovery />
            <HotItems />
            <InfoHot />
        </div>
    );
}

export default HomePage;
