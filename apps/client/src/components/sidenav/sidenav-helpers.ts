import React from "react";
import { nanoid } from "nanoid";

import { HomeIcon } from "../svgs/HomeIcon";
import { UserIcon } from "../svgs/UserIcon";
import { HeartIcon } from "../svgs/HeartIcon";
import { CompassIcon } from "../svgs/CompassIcon";
import { SettingsIcon } from "../svgs/SettingsIcon";

export interface SidenavLink {
  id: string;
  label: string;
  path: string;
  Icon: React.FC<{ className?: string }>;
}

export const sidenavLinks: SidenavLink[] = [
  {
    id: nanoid(),
    label: "Home",
    path: "/",
    Icon: HomeIcon,
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

  {
    id: nanoid(),
    label: "Profile",
    path: "/profile",
    Icon: UserIcon,
  },
  {
    id: nanoid(),
    label: "Settings",
    path: "/settings",
    Icon: SettingsIcon,
  },
];
