import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import userApi from "../../api/userApi";

import {
  addUserFromSaga,
  deleteUserFromSaga,
  editUserFromSaga,
  getUserFromSaga
} from "./userSlice";

export function* getUserSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
   
    const res = yield call(userApi.getUser);
    yield put({
      type: getUserFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* addUserSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(userApi.addUser, action.payload);
    yield put({
      type: addUserFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* deleteUserSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    
    const res = yield call(userApi.deleteUser, action.payload);
    yield put({
      type: deleteUserFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* editUserSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    
    const res = yield call(userApi.editUser, action.payload);
    yield put({
      type: editUserFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}