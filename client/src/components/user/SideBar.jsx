import { useSelector } from 'react-redux';
import { ListCategoryUser } from './ListCategoryUser';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
    const location = useLocation();
    const urlImgAvatar = useSelector((state) => state?.auth.urlImgAvatar);
    const user = useSelector((state) => state?.auth.user);
    const locationCurrent =
        // location.pathname.split('/').at(3) ||
        location.pathname.split('/').at(2);
    console.log('🚀 ~ SideBar ~ locationCurrent:', locationCurrent);
    return (
        <div className="max-lg:w-3/12 max-md:hidden w-2/12">
            <div className="border border-gray-100">
                <div className="flex gap-3 items-center= p-4 border-b border-gray-100 rounded-sm">
                    <img
                        src={urlImgAvatar}
                        alt=""
                        className="h-12 w-12 object-cover max-md:hidden rounded-full border-2 cursor-pointer"
                    />
                    <div>
                        <div>Xin chào 👋</div>
                        <div className="font-semibold text-black-second">
                            {user?.lastName + user?.firstName
                                ? user?.lastName + user?.firstName
                                : user?.email}
                        </div>
                    </div>
                </div>
                <div>
                    {ListCategoryUser.map((category, index) => (
                        <Link key={index} to={category.link}>
                            <div
                                className={`${
                                    category.link.includes(locationCurrent)
                                        ? 'bg-orange-100 text-yellow-600'
                                        : ''
                                } p-3 flex gap-2`}
                            >
                                <img
                                    src={
                                        locationCurrent === category.link
                                            ? category.svg_yellow
                                            : category.svg
                                    }
                                    alt=""
                                    className="h-5 -translate-y-[2px]"
                                />
                                <div className="text-sm">{category.title}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideBar;
