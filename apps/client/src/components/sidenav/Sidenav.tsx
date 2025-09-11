import React from "react";

import { sidenavLinks } from "./sidenav-helpers";

export const Sidenav: React.FC = () => {
  return (
    <div className="max-w-[260px] w-full bg-lume-secondary-dark rounded-2xl flex flex-col p-6">
      {sidenavLinks.map((link, index) => (
        <a
          key={link.id}
          href={link.path}
          className="text-lume-primary-light font-poppins font-[200] text-lg py-2"
        >
          {link.label}

          {index === 2 && (
            <div className="h-[1px] bg-lume-primary-light/5 w-full mt-4" />
          )}
        </a>
      ))}
    </div>
  );
};

export default Sidenav;
