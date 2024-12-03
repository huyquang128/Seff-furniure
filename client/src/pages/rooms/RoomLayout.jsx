import CategoryHome from '@/components/home/CategoryHome';
import FooterHome from '@/components/home/FooterHome';
import HeaderHome from '@/components/home/HeaderHome';
import TopbarHeader from '@/components/home/TopbarHeader';
import { Outlet } from 'react-router-dom';

function RoomLayout() {
    return (
        <div className="w-full">
            <div className="top-0 right-0 left-0 fixed z-20 bg-white">
                <TopbarHeader />
                <HeaderHome />
                <CategoryHome />
            </div>
            <Outlet />
            <FooterHome />
        </div>
    );
}

export default RoomLayout;
