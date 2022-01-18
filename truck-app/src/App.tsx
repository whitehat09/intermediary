import { Route, Routes } from "react-router-dom";

import { AddGoods } from "./page/AddGoods/AddGoods";
import { AddTruck } from "./page/AddTruck/AddTruck";
import { AddUser } from "./page/AddUser/AddUser";
import { Dashboard } from "./page/Dashboard/Dashboard";
import { EditGoods } from "./page/EditGoods/EditGoods";
import { EditTruck } from "./page/EditTruck/EditTruck";
import { EditUser } from "./page/EditUser/EditUser";
import { Goods } from "./page/Goods/Goods";
import { Home } from "./page/Home/Home";
import { MyAccount } from "./page/MyAccount/MyAccount";
import NotFound from "./page/NotFound/NotFound";
import { SignInOutContainer } from "./page/SignInOutContainer/SignInOutContainer";
import { Truck } from "./page/Truck/Truck";
import { TruckUser } from "./page/TruckUser/TruckUser";
import { Users } from "./page/Users/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInOutContainer />} />

        <Route path="/home" element={<Home />}>
          <Route path="truck" element={<TruckUser />} />
         
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
