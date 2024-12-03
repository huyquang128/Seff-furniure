import { Outlet } from 'react-router-dom';
import HeaderHome from './HeaderHome';
import TopbarHeader from './TopbarHeader';
import FooterHome from './FooterHome';
import CategoryHome from './CategoryHome';

function HomeLayout() {
    return (
        <div className="w-full overflow-hidden">
            <div className="top-0 right-0 left-0 fixed  bg-white z-20">
                <TopbarHeader />
                <HeaderHome />
                <CategoryHome />
            </div>
            <Outlet />
            <FooterHome />
        </div>
    );
}

export default HomeLayout;
