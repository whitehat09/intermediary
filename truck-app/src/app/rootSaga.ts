import { takeEvery } from "redux-saga/effects";
import { signInSaga } from "../features/auth/authSaga";
import { signIn } from "../features/auth/authSlice";
import { addCargoTypeSaga, deleteCargoTypeSaga, editCargoTypeSaga, getCargoTypeSaga } from "../features/cargoType/cargoTypeSaga";
import { addCargoType, deleteCargoType, editCargoType, getCargoType } from "../features/cargoType/cargoTypeSlice";
import { addTruckSaga, deleteTruckSaga, editTruckSaga, getTruckSaga } from "../features/truck/truckSaga";
import { addTruck, deleteTruck, editTruck, getTruck } from "../features/truck/truckSlice";
import { addUserSaga, deleteUserSaga, editUserSaga, getUserSaga } from "../features/user/userSaga";
import { addUser, deleteUser, editUser, getUser } from "../features/user/userSlice";


// tổng các trường tính năng
export function* rootSaga() {
  //auth
  yield takeEvery(signIn().type, signInSaga);
  //truck
  yield takeEvery(getTruck().type,getTruckSaga);
  yield takeEvery(addTruck().type,addTruckSaga);
  yield takeEvery(deleteTruck().type,deleteTruckSaga);
  yield takeEvery(editTruck().type,editTruckSaga);
  //user
  yield takeEvery(getUser().type,getUserSaga);
  yield takeEvery(addUser().type,addUserSaga);
  yield takeEvery(deleteUser().type,deleteUserSaga);
  yield takeEvery(editUser().type,editUserSaga);
  //cargoType
  yield takeEvery(getCargoType().type,getCargoTypeSaga);
  yield takeEvery(addCargoType().type,addCargoTypeSaga);
  yield takeEvery(deleteCargoType().type,deleteCargoTypeSaga);
  yield takeEvery(editCargoType().type,editCargoTypeSaga);
 
}
