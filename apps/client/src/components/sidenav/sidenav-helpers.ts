import { HomeIcon } from "../svgs/HomeIcon";
import { UserIcon } from "../svgs/UserIcon";
import { HeartIcon } from "../svgs/HeartIcon";
import { CompassIcon } from "../svgs/CompassIcon";
import { SettingsIcon } from "../svgs/SettingsIcon";
import React from "react";

export interface SidenavLink {
  id: number;
  label: string;
  path: string;
  Icon: React.FC<{ className?: string }>;
}

export const sidenavLinks: SidenavLink[] = [
  {
    id: 1,
    label: "Home",
    path: "/",
    Icon: HomeIcon,
  },
  {
    id: 2,
    label: "Explore",
    path: "/explore",
    Icon: CompassIcon,
  },
  {
    id: 3,
    label: "Favorites",
    path: "/favorites",
    Icon: HeartIcon,
  },

  {
    id: 4,
    label: "Profile",
    path: "/profile",
    Icon: UserIcon,
  },
  {
    id: 5,
    label: "Settings",
    path: "/settings",
    Icon: SettingsIcon,
  },
];
