import React from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "./navbar-helpers";

export const Navbar: React.FC = () => {
  return (
    <div className="w-full absolute bottom-0 left-0 z-50 max-mobile-768:flex hidden">
      <nav className="w-full bg-lume-primary-dark flex items-center justify-between px-6">
        {navbarLinks.map((link) => {
          return (
            <NavLink
              to={link.path}
              key={link.id}
              className="flex items-center py-6"
            >
              <link.Icon />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
