import React from "react";
import { nanoid } from "nanoid";

import { UserIcon } from "../svgs/UserIcon";
import { HeartIcon } from "../svgs/HeartIcon";
import { CompassIcon } from "../svgs/CompassIcon";

export interface SidenavLink {
  id: string;
  label: string;
  path: string;
  Icon: React.FC<{ className?: string }>;
}

export const sidenavLinks: SidenavLink[] = [
  {
    id: nanoid(),
    label: "Movies",
    path: "/",
    Icon: HeartIcon,
  },
  {
    id: nanoid(),
    label: "TV Shows",
    path: "/tv-shows",
    Icon: CompassIcon,
  },
  {
    id: nanoid(),
    label: "Profile",
    path: "/profile",
    Icon: UserIcon,
  },
  {
    id: nanoid(),
    label: "Favorites",
    path: "/favorites",
    Icon: HeartIcon,
  },
  {
    id: nanoid(),
    label: "My Watchlist",
    path: "/watchlist",
    Icon: CompassIcon,
  },
];
