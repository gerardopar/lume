import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { PrivateRoute } from "./PrivateRoute";
import { WatchList } from "../pages/watchlist/WatchList";
import { Favorites } from "../pages/favorites/Favorites";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route
          path="/watchlist"
          element={<PrivateRoute children={<WatchList />} />}
        />
        <Route
          path="/favorites"
          element={<PrivateRoute children={<Favorites />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
