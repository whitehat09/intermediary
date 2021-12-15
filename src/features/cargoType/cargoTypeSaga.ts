import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import cargoTypeApi from "../../api/cargoTypeApi";

import {
  addCargoTypeFromSaga,
    deleteCargoTypeFromSaga,
    editCargoTypeFromSaga,
    getCargoTypeFromSaga
} from "./cargoTypeSlice";

export function* getCargoTypeSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(cargoTypeApi.getCargoType);
    yield put({
      type: getCargoTypeFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* addCargoTypeSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(cargoTypeApi.addCargoType, action.payload);
    yield put({
      type: addCargoTypeFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* deleteCargoTypeSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    
    const res = yield call(cargoTypeApi.deleteCargoType, action.payload);
    yield put({
      type: deleteCargoTypeFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* editCargoTypeSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    
    const res = yield call(cargoTypeApi.editCargoType, action.payload);
    yield put({
      type: editCargoTypeFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
