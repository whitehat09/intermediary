import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  admin: any;
  dataLogin:any
  isLoginAdmin:Boolean;
  currentUsers:any;
  isLoginUser:Boolean;
}
const initialState: InitialState = {
  admin:{
    email: "admin",
    password: "123123"
  },
  dataLogin:{
    email: "",
    password: ""
  },
  currentUsers:{
    email: "",
    accountType:'',
    name:''
  },
  isLoginAdmin:false,
  isLoginUser:false,

 
};

export const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signInAdmin: (state) => {// 
      state.isLoginAdmin=true;
    },
    signoutAdmin: (state) => {// 
      state.isLoginAdmin=false;
    },
    signIn: (state) => {
      // state.dataLogin.email=action.payload.email;
      // state.dataLogin.password=action.payload.password;
      state.isLoginUser=true;
      return state;
    },
    signout: (state) => {// 
      state.isLoginUser=false;
    },
    signInFormSaga: (state, action) => {
      console.log('signInFormSaga',action.payload)
      localStorage.setItem(`username`, action.payload.user.username);
      localStorage.setItem(`token`, action.payload.user.token);
    },
    
    
    
  },
});
export const { signInAdmin,signoutAdmin  } = authSlice.actions;
export const { signIn,signInFormSaga ,signout } = authSlice.actions;






export default authSlice.reducer;
