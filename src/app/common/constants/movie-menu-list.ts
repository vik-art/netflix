import { MovieMenu } from '../interfaces/menu.interface';

export const MOVIE_MENU_LIST: Array<MovieMenu> = [
  {
    label: 'Popular',
    type: '/popular',
  },
  {
    label: 'Now Playing',
    type: '/now_playing',
  },
  {
    label: 'Top Rated',
    type: '/top_rated',
  },
  {
    label: 'Upcoming',
    type: '/upcoming',
  },
];
