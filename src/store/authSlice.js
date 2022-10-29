import{createSlice} from '@reduxjs/toolkit'



//import { redirect } from 'react-router-dom';


const initialAuthState ={
    isAuth:false,
    authId:null,
    token:null,
    expirationDate:null
    
};


const authSlice =createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuth = !!action.payload.token;
            state.authId = action.payload.userId;
            state.token =action.payload.token;
            // state.expirationDate=action.payload.expirationDate;
            state.expirationDate=action.payload.expiration || new Date(new Date().getTime()+ 1000*60*60);
            
            // const tokenExpirationDate=new Date(state.expirationDate);
            localStorage.setItem('userData',JSON.stringify({userId:action.payload.userId, token:action.payload.token,expiration:new Date(state.expirationDate.toISOString())}))
    
            // setTimeout(this.logout(),tokenExpirationDate-new Date());
        },
        logout(state){
            state.isAuth = false;
            state.authId =null;
            state.token=null;
            state.expirationDate=null;
            localStorage.removeItem('userData');
        },
        signUp(state , action){
             
           //sendSignUpData(action.payload.user);
    }
}
});

export const authActions = authSlice.actions;
export default authSlice;