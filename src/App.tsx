import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInOutContainer } from "./containers/SignInOutContainer/SignInOutContainer";
import ScrollToTop from "./layouts/ScrollToTop/ScrollToTop";
import { Dashboard } from "./page/Dashboard/layout/Dashboard/Dashboard";
import { Goods } from "./page/Dashboard/page/Goods/Goods";
import { Truck } from "./page/Dashboard/page/Truck/Truck";
import { Users } from "./page/Dashboard/page/Users/Users";

import { Home } from "./page/Home/Home";
import NotFound from "./page/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInOutContainer />} />

        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="truck" element={<Truck />} />
          <Route path="goods" element={<Goods />} />
          <Route path="user" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
