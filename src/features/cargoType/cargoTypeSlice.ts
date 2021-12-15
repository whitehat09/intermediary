import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    cargoType: any;

}
const initialState: InitialState = {
    cargoType:[],
 

 
};

export const cargoTypeSlice = createSlice({
  name: "cargoType",
  initialState,
  reducers: {
    
    getCargoType: (state) => {
    
     return state;
    },
    getCargoTypeFromSaga: (state, action) => {
    state.cargoType = action.payload;
    },
    addCargoType:(state) => {
      return state;
     },
     addCargoTypeFromSaga: (state, action) => {
     },
     editCargoType:(state) => {
      return state;
     },
     editCargoTypeFromSaga: (state, action) => {
     },
     deleteCargoType:(state)=>{
      return state;
     },deleteCargoTypeFromSaga:(state, action) => {
      return state;
     },
  },
});
export const { getCargoType,getCargoTypeFromSaga } = cargoTypeSlice.actions;
export const { addCargoType,addCargoTypeFromSaga } = cargoTypeSlice.actions;
export const { editCargoType,editCargoTypeFromSaga } = cargoTypeSlice.actions;
export const { deleteCargoType,deleteCargoTypeFromSaga } = cargoTypeSlice.actions;

export default cargoTypeSlice.reducer;
