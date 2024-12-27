import Chair from '@/pages/rooms/Kitchen/Chair';
import CompletekitchenCabinetSystem from '@/pages/rooms/Kitchen/CompletekitchenCabinetSystem';
import DiningRoom from '@/pages/rooms/Kitchen/DiningRoom';
import Exterior from '@/pages/rooms/Kitchen/Exterior';
import KitchenAccessories from '@/pages/rooms/Kitchen/KitchenAccessories';
import KitchenCabinets from '@/pages/rooms/Kitchen/KitchenCabinets';
import KitchenCabinetShelves from '@/pages/rooms/Kitchen/KitchenCabinetShelves';
import KitchenCornerCabinet from '@/pages/rooms/Kitchen/KitchenCornerCabinet';
import KitchenRoom from '@/pages/rooms/Kitchen/KitchenRoom';
import OutdoorAccessories from '@/pages/rooms/Kitchen/OutdoorAccessories';
import OutdoorFurniture from '@/pages/rooms/Kitchen/OutdoorFurniture';
import Table from '@/pages/rooms/Kitchen/Table';
import WallMountedkitchenCabinets from '@/pages/rooms/Kitchen/WallMountedkitchenCabinets';

export const routeKitchen = [
    {
        path: 'kitchen/Kitchen-Room',
        component: <KitchenRoom />,
    },
    {
        path: 'kitchen/Kitchen-Room/Kitchen-accessories',
        component: <KitchenAccessories />,
    },
    //
    {
        path: 'kitchen/Dining-room',
        component: <DiningRoom />,
    },
    {
        path: 'kitchen/Dining-room/chair',
        component: <Chair />,
    },
    {
        path: 'kitchen/Dining-room/table',
        component: <Table />,
    },
    //
    {
        path: 'kitchen/Kitchen-cabinet-shelves',
        component: <KitchenCabinetShelves />,
    },
    {
        path: 'kitchen/Kitchen-cabinet-shelves/Kitchen-cabinets',
        component: <KitchenCabinets />,
    },
    {
        path: 'kitchen/Kitchen-cabinet-shelves/Wall-mounted-kitchen-cabinets',
        component: <WallMountedkitchenCabinets />,
    },
    {
        path: 'kitchen/Kitchen-cabinet-shelves/Kitchen-corner-cabinet',
        component: <KitchenCornerCabinet />,
    },
    {
        path: 'kitchen/Kitchen-cabinet-shelves/Complete-kitchen-cabinet-system',
        component: <CompletekitchenCabinetSystem />,
    },
    //
    {
        path: 'kitchen/Exterior',
        component: <Exterior />,
    },
    {
        path: 'kitchen/Exterior/Outdoor-furniture',
        component: <OutdoorFurniture />,
    },
    {
        path: 'kitchen/Exterior/Outdoor-accessories',
        component: <OutdoorAccessories />,
    },
];
