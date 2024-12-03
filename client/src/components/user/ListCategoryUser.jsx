import user2 from '@/assets/svg/user2.svg';
import bag_black from '@/assets/svg/bag-black.svg';
import heart from '@/assets/svg/heart.svg';
import location from '@/assets/svg/location.svg';
import card from '@/assets/svg/card.svg';
import setting from '@/assets/svg/setting.svg';

import user2_yellow from '@/assets/svg/user2_yellow.svg';
import bag_black_yellow from '@/assets/svg/bag-black_yellow.svg';
import heart_yellow from '@/assets/svg/heart_yellow.svg';
import location_yellow from '@/assets/svg/location_yellow.svg';
import card_yellow from '@/assets/svg/card_yellow.svg';
import setting_yellow from '@/assets/svg/setting_yellow.svg';

export const ListCategoryUser = [
    {
        title: 'Thông tin cá nhân',
        svg_yellow: user2_yellow,
        svg: user2,
        link: 'Personal-Information',
    },
    {
        title: 'Đơn hàng của tôi',
        svg_yellow: bag_black_yellow,
        svg: bag_black,
        link: 'My-orders/All-Orders',
    },
    {
        title: 'Sản phẩm yêu thích',
        svg_yellow: heart_yellow,
        svg: heart,
        link: 'My-favorite',
    },
    {
        title: 'Quản lý địa chỉ',
        svg_yellow: location_yellow,
        svg: location,
        link: 'manage-address',
    },
    {
        title: 'Thẻ Ngân hàng',
        svg_yellow: card_yellow,
        svg: card,
        link: 'save-card',
    },
    {
        title: 'Cài đặt',
        svg_yellow: setting_yellow,
        svg: setting,
        link: 'setting',
    },
];
