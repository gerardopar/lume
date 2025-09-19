import PlusIcon from "@components/svgs/PlusIcon";
import HeartIcon from "@components/svgs/HeartIcon";
import ShareIcon from "@components/svgs/ShareIcon";

export enum CardActionMenuEnum {
  Watchlist = "watchlist",
  Favorites = "favorites",
  Share = "share",
}

export interface CardActionsMenuItem {
  id: number;
  label: string;
  path: string;
  Icon: React.FC<{ className?: string }>;
  type: CardActionMenuEnum;
}

export const cardActionsMenu: CardActionsMenuItem[] = [
  {
    id: 1,
    label: "Watchlist",
    path: "watchlist",
    Icon: PlusIcon,
    type: CardActionMenuEnum.Watchlist,
  },
  {
    id: 2,
    label: "Favorites",
    path: "favorites",
    Icon: HeartIcon,
    type: CardActionMenuEnum.Favorites,
  },
  {
    id: 3,
    label: "Share",
    path: "share",
    Icon: ShareIcon,
    type: CardActionMenuEnum.Share,
  },
];
