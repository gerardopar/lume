import React from "react";

import { trpc } from "../../utils/trpc";

export const Home: React.FC = () => {
  const { data } = trpc.hello.useQuery();

  console.log(data);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
