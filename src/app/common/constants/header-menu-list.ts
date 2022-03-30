import { ImenuItem } from "../interfaces/menu.interface";

export const HEADER_MENU_LIST:Array<ImenuItem> = [
    {
       label: 'Favourite',
       link: '/favourite'
    },
    {
        label: 'Selected',
        link: '/selected'
   },
   {
      label: 'Popular',
      link: '/popular'
    }
]