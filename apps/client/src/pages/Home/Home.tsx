import React from "react";

import { Hero } from "@components/hero/Hero";

export const Home: React.FC = () => {
  return (
    <div className="h-screen w-full bg-lume-primary-dark p-6">
      {/* left handle panel */}
      <div className="max-[300px] w-full"></div>

      {/* right handle panel */}
      <div className="h-full w-full flex flex-col">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
