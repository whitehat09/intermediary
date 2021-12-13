import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  admin: any;

  isLoginAdmin:Boolean;
  currentUsers:any;
  isLoginUser:Boolean;
}
const initialState: InitialState = {
  admin:{
    email: "admin",
    password: "123123"
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
    signIn: (state) => {// 
      // if(state.admin.email === action.payload.email &&state.admin.password === action.payload.password){
      //   state.isLoginAdmin=true;
      //   alert('đây là tài khoản admin')
      // }
      // else{
      //   alert('đây  không là tài khoản admin')
      // }
      
      return state;
    },
    signInFormSaga: (state, action) => {
      state.currentUsers = action.payload.user;
      state.isLoginUser = true;
      console.log(`đây  không là tài khoản user ${action.payload}`)
      
      // localStorage.setItem(`username`, action.payload.user.username);
      // localStorage.setItem(`token`, action.payload.user.token);
    },
    
    
  },
});
export const { signInAdmin,signoutAdmin  } = authSlice.actions;
export const { signIn,signInFormSaga  } = authSlice.actions;





export default authSlice.reducer;
