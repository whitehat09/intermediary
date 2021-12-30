import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInOutContainer } from "./containers/SignInOutContainer/SignInOutContainer";
import { Dashboard } from "./page/Dashboard/Dashboard";

import { AddGoods } from "./page/Dashboard/page/AddGoods/AddGoods";
import { AddTruck } from "./page/Dashboard/page/AddTruck/AddTruck";
import { AddUser } from "./page/Dashboard/page/AddUser/AddUser";
import { EditGoods } from "./page/Dashboard/page/EditGoods/EditGoods";
import { EditTruck } from "./page/Dashboard/page/EditTruck/EditTruck";
import { EditUser } from "./page/Dashboard/page/EditUser/EditUser";
import { Goods } from "./page/Dashboard/page/Goods/Goods";
import { Truck } from "./page/Dashboard/page/Truck/Truck";
import { Users } from "./page/Dashboard/page/Users/Users";
import { EX } from "./page/EX/EX";

import { Home } from "./page/Home/Home";
import { MyAccount } from "./page/MyAccount/MyAccount";

import NotFound from "./page/NotFound/NotFound";
import { TruckUser } from "./page/TruckUser/TruckUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInOutContainer />} />
        <Route path="/home" element={<Home />}>
          <Route path="truck" element={<TruckUser />} />
          <Route path="ex" element={<EX />} />
          <Route path="myaccount" element={<MyAccount />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="truck" element={<Truck />} />
          <Route path="truckadd" element={<AddTruck />} />
          <Route path="truckedit/:id" element={<EditTruck />} />
          <Route path="goods" element={<Goods />} />
          <Route path="goodsadd" element={<AddGoods />} />
          <Route path="goodsedit/:id" element={<EditGoods />} />
          <Route path="user" element={<Users />} />
          <Route path="useradd" element={<AddUser />} />
          <Route path="useredit/:id" element={<EditUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
