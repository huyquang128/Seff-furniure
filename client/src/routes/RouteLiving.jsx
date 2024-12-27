import DonChair from '@/pages/rooms/livingRoom/BanhChair';
import BookShelf from '@/pages/rooms/livingRoom/bookShelf';
import BanhChair from '@/pages/rooms/livingRoom/DonChair';
import LivingInteriorRoom from '@/pages/rooms/livingRoom/LivingInteriorRoom';
import OpenShelves from '@/pages/rooms/livingRoom/OpenShelves';
import Shelf from '@/pages/rooms/livingRoom/Shelf';
import ShelfRacksAndShelves from '@/pages/rooms/livingRoom/ShelfRacksAndShelves';
import SideCabinet from '@/pages/rooms/livingRoom/SideCabinet';
import Sofa from '@/pages/rooms/livingRoom/Sofa';
import SofaBed from '@/pages/rooms/livingRoom/SofaBed';
import SofaChild from '@/pages/rooms/livingRoom/SofaChild';
import StorageCabinet from '@/pages/rooms/livingRoom/StorageCabinet';
import TeaTable from '@/pages/rooms/livingRoom/TeaTable';

export const routeLiving = [
    {
        path: 'living-room/living-room-furniture',
        component: <LivingInteriorRoom />,
    },
    {
        path: 'living-room/living-room-furniture/Don-Chair',
        component: <DonChair />,
    },
    {
        path: 'living-room/living-room-furniture/Arm-chair',
        component: <BanhChair />,
    },
    {
        path: 'living-room/living-room-furniture/Tea-table',
        component: <TeaTable />,
    },
    {
        path: 'living-room/Sofa',
        component: <Sofa />,
    },
    {
        path: 'living-room/Sofa/Sofa',
        component: <SofaChild />,
    },
    {
        path: 'living-room/Sofa/Sofa-Bed',
        component: <SofaBed />,
    },
    {
        path: 'living-room/Storage-Cabinet-shelves',
        component: <Shelf />,
    },
    {
        path: 'living-room/Storage-Cabinet-shelves/book-shelf',
        component: <BookShelf />,
    },
    {
        path: 'living-room/Storage-Cabinet-shelves/Shelf-Racks-and-ll-Shelves',
        component: <ShelfRacksAndShelves />,
    },
    {
        path: 'living-room/Storage-Cabinet-shelves/Open-shelves',
        component: <OpenShelves />,
    },
    {
        path: 'living-room/Storage-Cabinet-shelves/Storage-cabinet',
        component: <StorageCabinet />,
    },
    {
        path: 'living-room/Storage-Cabinet-shelves/Side-cabinet',
        component: <SideCabinet />,
    },
];
