import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: any;

}
const initialState: InitialState = {
    user:[],
 

 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
     return state;
    },
    getUserFromSaga: (state, action) => {
    state.user = action.payload;
    },
    addUser:(state) => {
      return state;
     },
     addUserFromSaga: (state, action) => {
     },
     editUser:(state) => {
      return state;
     },
     editUserFromSaga: (state, action) => {
     },
     deleteUser:(state)=>{
      return state;
     },deleteUserFromSaga:(state, action) => {
      return state;
     },
    
  },
});



export const { getUser,getUserFromSaga } = userSlice.actions;
export const { addUser,addUserFromSaga } = userSlice.actions;
export const { editUser,editUserFromSaga } = userSlice.actions;
export const { deleteUser,deleteUserFromSaga } = userSlice.actions;

export default userSlice.reducer;
