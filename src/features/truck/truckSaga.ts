import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import truckApi from "../../api/truckApi";

import {
  addTruckFromSaga,
  deleteTruckFromSaga,
  editTruckFromSaga,
  getTruckFromSaga
} from "./truckSlice";

export function* getTruckSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
   
    const res = yield call(truckApi.getTruck);
    yield put({
      type: getTruckFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* addTruckSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(truckApi.addTruck, action.payload);
    yield put({
      type: addTruckFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* deleteTruckSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    
    const res = yield call(truckApi.deleteTruck, action.payload);
    yield put({
      type: deleteTruckFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* editTruckSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    
    const res = yield call(truckApi.editTruck, action.payload);
    yield put({
      type: editTruckFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
