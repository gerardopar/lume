import React from "react";
import { NavLink } from "react-router-dom";

import UserProfilePicture from "@components/shared/UserProfilePicture";
import LogoutButton from "@components/logout/LogoutButton";
import AuthWrapper from "@components/auth/AuthWrapper";
import UserProfile from "../user-profile/UserProfile";

import { sidenavLinks } from "./sidenav-helpers";

import { useModal } from "../../stores/modals";
import { useCurrentUser } from "../../stores/user";

export const Sidenav: React.FC = () => {
  const { isLoggedIn } = useCurrentUser();
  const { open } = useModal();

  // routes that require auth
  const protectedPaths = ["/profile", "/favorites", "/watchlist"];

  return (
    <div className="max-w-[240px] w-full bg-lume-secondary-dark flex flex-col p-6">
      <nav className="flex flex-1 flex-col">
        {sidenavLinks.map((link, index) => {
          const { id, Icon, label, path } = link;

          const isProtected = protectedPaths.includes(path);

          let icon = <Icon className="w-5 h-5 mr-2" />;

          // swap icon with profile pic if logged in
          if (path === "/profile" && isLoggedIn) {
            icon = (
              <UserProfilePicture containerClassName="w-[24px] h-[24px] rounded-full border-[1px] border-lume-primary-light mr-2" />
            );
          }

          return (
            <React.Fragment key={id}>
              <NavLink
                to={isProtected && !isLoggedIn ? "" : path}
                onClick={(e) => {
                  if (isProtected && !isLoggedIn) {
                    e.preventDefault(); // prevent navigation
                    open(<AuthWrapper />); // open login modal
                  } else if (path === "/profile" && isLoggedIn) {
                    e.preventDefault();
                    open(<UserProfile />, {
                      modalBoxClassName: "max-w-[400px]",
                    });
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center font-poppins font-[200] text-lg py-2 ${
                    isActive && !isProtected
                      ? "text-lume-green"
                      : "text-lume-primary-light"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>

              {index === 2 && (
                <div className="h-[1px] bg-lume-primary-light/10 my-2" />
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <LogoutButton />
    </div>
  );
};

export default Sidenav;
