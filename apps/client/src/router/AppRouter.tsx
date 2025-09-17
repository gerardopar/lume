import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { PrivateRoute } from "./PrivateRoute";
import { WatchList } from "../pages/watchlist/WatchList";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/watchlist"
          element={<PrivateRoute children={<WatchList />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
