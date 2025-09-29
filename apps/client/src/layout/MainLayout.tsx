import React from "react";

import Navbar from "@components/navbar/Navbar";
import Sidenav from "@components/sidenav/Sidenav";
import RecommendationsChatBotButton from "@components/recommendations-chatbot/RecommendationsChatBotButton";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-screen flex w-full bg-lume-primary-dark">
      {/* side nav panel */}
      <Sidenav />

      {/* main content panel */}
      <div className="h-full w-full flex flex-col px-6 overflow-y-scroll relative max-mobile-640:px-0">
        {children}
      </div>

      <RecommendationsChatBotButton />

      <Navbar />
    </div>
  );
};

export default MainLayout;
