import React from "react";

import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const links = [
    { id: 1, to: "/", label: "Home" },
    { id: 2, to: "/movies", label: "Movies" },
    { id: 3, to: "/tv-shows", label: "TV Shows" },
    { id: 4, to: "/kids", label: "Kids" },
    { id: 5, to: "/my-list", label: "My List" },
  ];

  return (
    <header className="w-full flex items-center justify-between fixed top-0 left-0 right-0 z-50 px-4">
      <nav className="w-full flex">
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className="px-1 py-2 text-white uppercase"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="w-20 h-20">
        <img src="" alt="" />
      </div>
    </header>
  );
};
