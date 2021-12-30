import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  truck: any;

}
const initialState: InitialState = {
  truck:[],
};

export const truckSlice = createSlice({
  name: "truck",
  initialState,
  reducers: {
    
    getTruck: (state) => {
     return state;
    },
    getTruckFromSaga: (state, action) => {
    state.truck = action.payload;
    },
    addTruck:(state) => {
      return state;
     },
     addTruckFromSaga: (state, action) => {
    //    console.log(action.payload)
    //  state.truck = action.payload;
     },
     editTruck:(state) => {
      return state;
     },
     editTruckFromSaga: (state, action) => {
    //    console.log(action.payload)
    //  state.truck = action.payload;
     },
     deleteTruck:(state)=>{
      return state;
     },deleteTruckFromSaga:(state, action) => {
      // state.truck = action.payload;
      return state;
     },
    
  },
});



export const { getTruck,getTruckFromSaga } = truckSlice.actions;
export const { addTruck,addTruckFromSaga } = truckSlice.actions;
export const { deleteTruck,deleteTruckFromSaga } = truckSlice.actions;
export const { editTruck,editTruckFromSaga } = truckSlice.actions;

export default truckSlice.reducer;
