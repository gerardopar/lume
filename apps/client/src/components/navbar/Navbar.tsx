import React from "react";
import { NavLink } from "react-router-dom";

import UserProfilePicture from "@components/shared/UserProfilePicture";
import UserProfile from "../user-profile/UserProfile";

import { useCurrentUser } from "../../stores/user";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../stores/modals";
import { navbarLinks } from "./navbar-helpers";

export const Navbar: React.FC = () => {
  const protectedPaths = ["/profile", "/favorites", "/watchlist"];
  const { isLoggedIn } = useCurrentUser();
  const { showAuth } = useAuth();
  const { open } = useModal();

  return (
    <div className="w-full absolute bottom-0 left-0 z-50 max-mobile-768:flex hidden">
      <nav className="w-full bg-lume-primary-darker flex items-center justify-between px-6">
        {navbarLinks.map((link) => {
          const { id, Icon, label, path } = link;

          const isProtected = protectedPaths.includes(path);

          let icon = <Icon className="w-5 h-5 mb-1" />;

          if (path === "/profile" && isLoggedIn) {
            icon = (
              <UserProfilePicture containerClassName="w-[24px] h-[24px] rounded-full border-[1px] border-lume-primary-light mb-1" />
            );
          }

          return (
            <React.Fragment key={id}>
              <NavLink
                to={path}
                onClick={(e) => {
                  if (isProtected && !isLoggedIn) {
                    e.preventDefault();
                    showAuth();
                  } else if (path === "/profile" && isLoggedIn) {
                    e.preventDefault();
                    open(<UserProfile />, {
                      modalBoxClassName: "max-w-[400px]",
                    });
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center justify-center flex-col font-poppins font-[200] text-sm py-2 ${
                    isActive
                      ? "text-lume-green border-t-2 border-lume-green bg-lume-primary-dark/30"
                      : "text-lume-primary-light/70"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
