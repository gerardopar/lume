import React from "react";

import Sidenav from "@components/sidenav/Sidenav";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-screen flex w-full bg-lume-primary-dark">
      {/* side nav panel */}
      <Sidenav />

      {/* main content panel */}
      <div className="h-full w-full flex flex-col px-6 overflow-y-scroll relative">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
