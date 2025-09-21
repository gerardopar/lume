import React from "react";
import AppRouter from "./router/AppRouter";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Toast from "@components/toast/Toast";
import Modal from "@components/modal/Modal";
import TrpcProvider from "./providers/TrpcProvider";

import "./firebase/config"; // initialize firebase

const App: React.FC = () => {
  return (
    <TrpcProvider>
      <AppRouter />
      <Modal />
      <Toast />
      <ReactQueryDevtools />
    </TrpcProvider>
  );
};

export default App;
