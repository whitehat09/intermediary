import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";

import {  signInFormSaga } from "./authSlice";
import authApi from "../../api/authApi";

export function* signInSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const data = action.payload;
   
    const res = yield call(authApi.signIn, data);
    yield put({
      type: signInFormSaga.type,
      payload: res,
    });
  } catch (error: any) {
   console.log(error);
  }
}
// export function* signUpSaga(
//   action: PayloadAction<any>
// ): SagaIterator<void> {
//   try {
//     const data = action.payload;
//     const res = yield call(authApi.signUp, data);
//     yield put({
//       type: signUpFormSaga.type,
//       payload: res,
//     });
//   } catch (error: any) {
//     yield put({
//       type: errorSignUp.type,
//       payload: error.response.data.errors,
//     });
//   }
// }
