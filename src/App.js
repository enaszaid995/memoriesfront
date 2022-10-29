
import './App.css';
import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
// import Users from './components/users/Users';
// import Posts from './components/Posts/Posts';
// import NewPlace from './components/Posts/NewPlace';

// import Auth  from './components/users/Auth';
// import UpdatedPlaceForm from './components/Posts/UpdatedPlaceForm';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/authSlice';

const Users = React.lazy(()=>import('./components/users/Users'))
const Posts = React.lazy(()=>import('./components/Posts/Posts'))

const NewPlace = React.lazy(()=>import('./components/Posts/NewPlace'))
const Auth = React.lazy(()=>import('./components/users/Auth'))
const UpdatedPlaceForm = React.lazy(()=>import('./components/Posts/UpdatedPlaceForm'))
  let logoutTimer;

const App=() =>{
  const auth=useSelector(state => state.auth);
  const token = auth.token;
  const expirationDate = auth.expirationDate;

  const disapatch=useDispatch();
 

  useEffect(() => {
    
    
    if (token && expirationDate) {
      const remainingTime = new Date(expirationDate.getTime()) - new Date().getTime();
      logoutTimer = setTimeout(()=>{disapatch(authActions.logout())}, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  },[disapatch,token,expirationDate]);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token &&  new Date(storedData.expiration) > new Date()){
      disapatch(authActions.login({userId:storedData.userId, token:storedData.token,expiration:new Date(storedData.expiration)}));
    
    }
  },[disapatch]);

  const router= createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
        <Route index path='/' element={<Users/>} action={'/posts/'}/>
        <Route path='/posts/:id' element={<Posts/>}  />
        <Route path='/posts/update/:id' element={<UpdatedPlaceForm/>}  />
        <Route path='/newplaceForm' element={<NewPlace/>} />
        
        <Route path='/auth' element={<Auth/>} />
       
    </Route>
  ))
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
