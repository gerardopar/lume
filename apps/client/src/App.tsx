import React from "react";
import AppRouter from "./router/AppRouter";

import Modal from "@components/modal/Modal";
import TrpcProvider from "./providers/TrpcProvider";

const App: React.FC = () => {
  return (
    <TrpcProvider>
      <AppRouter />
      <Modal />
    </TrpcProvider>
  );
};

export default App;
