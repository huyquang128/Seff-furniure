import { Link, Outlet, useLocation } from 'react-router-dom';
import CategoryHome from '../home/CategoryHome';
import HeaderHome from '../home/HeaderHome';
import TopbarHeader from '../home/TopbarHeader';
import FooterHome from '../home/FooterHome';
import SideBar from './SideBar';
import arr_right from '@/assets/svg/arr-right.svg';
import { ListCategoryUser } from './ListCategoryUser';

function UserLayout() {
    const location = useLocation();
    const pathCurrent = location.pathname.split('/').at(2);
    return (
        <div className="w-full">
            <div className="top-0 right-0 left-0 fixed z-20 bg-white">
                <TopbarHeader />
                <HeaderHome />
                <CategoryHome />
            </div>
            <div
                className="max-w-[1440px] mx-auto max-xl:px-[68px] max-lg:px-3 
                           max-lg:justify-start mt-44 mb-32 max-md:mt-32"
            >
                <h1 className="mb-10 flex text-sm">
                    <Link to="/">Trang chủ</Link>
                    <img src={arr_right} alt="" />
                    {ListCategoryUser.map((category, index) => (
                        <div key={index} className="text-yellow-base">
                            {category.link.includes(pathCurrent) ? (
                                <Link key={index} to={`/user/${category.link}`}>
                                    {category.title}
                                </Link>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                </h1>
                <div className="flex gap-12 ">
                    <SideBar />
                    <div className="flex-1 overflow-hidden max-md:w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
            <FooterHome />
        </div>
    );
}

export default UserLayout;
