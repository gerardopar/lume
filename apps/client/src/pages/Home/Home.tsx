import React from "react";

import Hero from "@components/hero/Hero";
import TopBar from "@components/topbar/TopBar";
import Sidenav from "@components/sidenav/Sidenav";

export const Home: React.FC = () => {
  return (
    <div className="h-screen flex w-full bg-lume-primary-dark p-6">
      {/* left handle panel */}
      <Sidenav />

      {/* right handle panel */}
      <div className="h-full w-full flex flex-col px-6">
        <TopBar />
        <Hero />
      </div>
    </div>
  );
};

export default Home;
