import React from "react";
import { NavLink } from "react-router-dom";

import LogoutButton from "@components/logout/LogoutButton";

import { sidenavLinks } from "./sidenav-helpers";

export const Sidenav: React.FC = () => {
  return (
    <div className="max-w-[240px] w-full bg-lume-secondary-dark flex flex-col p-6">
      <nav className="flex flex-1 flex-col">
        {sidenavLinks.map((link, index) => {
          const { id, Icon, label, path } = link;

          return (
            <>
              <NavLink
                key={id}
                to={path}
                className={({ isActive }) =>
                  `flex items-center  font-poppins font-[200] text-lg py-2 ${
                    isActive ? "text-lume-green" : "text-lume-primary-light"
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </NavLink>
              {index === 2 && (
                <div className="h-[1px] bg-lume-primary-light/10 my-2" />
              )}
            </>
          );
        })}
      </nav>

      <LogoutButton />
    </div>
  );
};

export default Sidenav;
