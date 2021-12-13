import { takeEvery } from "redux-saga/effects";
import { signInSaga } from "../features/auth/authSaga";
import { signIn } from "../features/auth/authSlice";


// tổng các trường tính năng
export function* rootSaga() {
  //auth
  yield takeEvery(signIn().type, signInSaga);

 
}
