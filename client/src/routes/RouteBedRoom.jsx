import BedChild from '@/pages/rooms/BedRoom/BedChild';
import BedFrame from '@/pages/rooms/BedRoom/BedFrame';
import BedroomFurniture from '@/pages/rooms/BedRoom/BedroomFurniture';
import BedsideCabinet from '@/pages/rooms/BedRoom/BedsideCabinet';
import BunkBed from '@/pages/rooms/BedRoom/BunkBed';
import ChestOfDrawers from '@/pages/rooms/BedRoom/ChestOfDrawers';
import ClothesHanger from '@/pages/rooms/BedRoom/ClothesHanger';
import DrawersUnderBed from '@/pages/rooms/BedRoom/DrawersUnderBed';
import DressingTable from '@/pages/rooms/BedRoom/DressingTable';
import Mattress from '@/pages/rooms/BedRoom/Mattress';
import MattressSubChildren from '@/pages/rooms/BedRoom/MattressSubChildren';
import OpenWardrobe from '@/pages/rooms/BedRoom/OpenWardrobe';
import Wardrobe from '@/pages/rooms/BedRoom/Wardrobe';

export const routeBedRoom = [
    {
        path: 'bed-room/Bed',
        component: <BedChild />,
    },
    {
        path: 'bed-room/Bed/Bed-frame',
        component: <BedFrame />,
    },
    {
        path: 'bed-room/Bed/Bunk-bed',
        component: <BunkBed />,
    },
    {
        path: 'bed-room/Bed/Drawers-under-the-bed',
        component: <DrawersUnderBed />,
    },
    {
        path: 'bed-room/Bedroom-Furniture',
        component: <BedroomFurniture />,
    },
    {
        path: 'bed-room/Bedroom-Furniture/bedside-cabinet',
        component: <BedsideCabinet />,
    },
    {
        path: 'bed-room/Bedroom-Furniture/Chest-of-drawers',
        component: <ChestOfDrawers />,
    },
    {
        path: 'bed-room/Bedroom-Furniture/Clothes-hanger',
        component: <ClothesHanger />,
    },
    {
        path: 'bed-room/Bedroom-Furniture/Dressing-table',
        component: <DressingTable />,
    },
    {
        path: 'bed-room/Mattress',
        component: <Mattress />,
    },
    {
        path: 'bed-room/Mattress/Mattress',
        component: <MattressSubChildren />,
    },
    {
        path: 'bed-room/Wardrobe',
        component: <Wardrobe />,
    },
    {
        path: 'bed-room/Wardrobe/Open-wardrobe',
        component: <OpenWardrobe />,
    },
];
