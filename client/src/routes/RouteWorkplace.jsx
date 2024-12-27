import Desk from '@/pages/rooms/Workroom/Desk';
import DeskCabinet from '@/pages/rooms/Workroom/DeskCabinet';
import HomeOffice from '@/pages/rooms/Workroom/HomeOffice';

export const routeWorkplace = [
    {
        path: 'work-room/Home-Office',
        component: <HomeOffice />,
    },
    {
        path: 'work-room/Home-Office/Desk',
        component: <Desk />,
    },
    {
        path: 'work-room/Home-Office/Desk-cabinet',
        component: <DeskCabinet />,
    },
];
