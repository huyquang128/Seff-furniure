import { useSelector } from 'react-redux';
import { ListCategoryUser } from './ListCategoryUser';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
    const location = useLocation();

    //state redux
    const urlImgAvatar = useSelector((state) => state?.auth.urlImgAvatar);
    const user = useSelector((state) => state?.auth.user);
    const urlImgAvatarData = useSelector(
        (state) => state?.auth.user?.urlImgAvatar
    );
    const locationCurrent =
        // location.pathname.split('/').at(3) ||
        location.pathname.split('/').at(2);

    return (
        <div className="max-xl:w-60 max-md:hidden">
            <div className="border border-gray-100">
                <div className="flex gap-3 items-center p-4 border-b border-gray-100 rounded-sm">
                    <div
                        className="h-10 w-10 object-cover max-md:hidden rounded-full  border-2 
                            cursor-pointer bg-blue-400 flex justify-center items-center overflow-hidden"
                    >
                        {urlImgAvatar || urlImgAvatarData ? (
                            <img
                                src={urlImgAvatarData || urlImgAvatar}
                                alt=""
                                className="object-cover"
                                // onMouseLeave={handleCloseToolkitUser}
                            />
                        ) : (
                            <div className="text-white"></div>
                        )}
                    </div>
                    <div>
                        <div>Xin chào 👋</div>
                        <div className="font-semibold text-black-second">
                            {user?.lastName && user?.firstName
                                ? user?.firstName + ' ' + user?.lastName
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
                                } p-3 flex gap-2 transition-all ease-in-out duration-300`}
                            >
                                <img
                                    src={
                                        category.link.includes(locationCurrent)
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
