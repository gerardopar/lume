import React from "react";
import AppRouter from "./router/AppRouter";

import TrpcProvider from "./providers/TrpcProvider";

const App: React.FC = () => {
  return (
    <TrpcProvider>
      <AppRouter />
    </TrpcProvider>
  );
};

export default App;
