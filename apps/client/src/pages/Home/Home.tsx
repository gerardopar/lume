import React from "react";

import { Hero } from "@components/hero/Hero";
import { Header } from "@components/header/Header";

export const Home: React.FC = () => {
  return (
    <div className="h-screen w-full bg-black">
      <Header />
      <div className="h-full w-full flex flex-col">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
