import React, {  useState } from 'react'
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import classes from './auth.module.css';
import Button from '../layouts/form/Button';
import Input from '../layouts/form/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH , VALIDATOR_REQUIRE } from '../layouts/validate/validators';
import { useHttp } from '../hooks/useHttp';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import UploadImage from '../layouts/form/UploadImage';
import ErrorModal from '../layouts/form/Error';
import LoadingSpinner from '../layouts/form/LoaddingSpinner';



const Auth = () => {

    const dispatch=useDispatch();
    let navigate=useNavigate();
    const {sendRequest,clearError,error,isLoadding }=useHttp();
    const [enteredName , setEnteredName] =useState({
        value:'',
        isValid:false
    });
    const [enteredEmail , setEnteredEmail] =useState({
        value:'',
        isValid:false
    });
    const [enteredPassword , setEnteredPassword] =useState({
        value:'',
        isValid:false
    });
    const [enteredImage , setEnteredImage] =useState({
        value:'',
        isValid:false
    });
    
    const [isLoginMode, setIsLoginMode]=useState(true);
   
   
    const switchHandler =(event)=>{
        event.preventDefault();
        setIsLoginMode(prevMode =>!prevMode);
    
    }
    const formData =new FormData();
    formData.append('name',enteredName.value);
    formData.append('email',enteredEmail.value);
    formData.append('password',enteredPassword.value);
    formData.append('image',enteredImage.value);
    // const userSignUp={
    //     name:enteredName.value,
    //     email:enteredEmail.value,
    //     password:enteredPassword.value
    //    };
    const signUpHAndler=async (event)=>{
        event.preventDefault()
        // const url = process.env.PUBLIC_URL
        try{
            const responseData= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signUp`,
        'POST',
        formData
        // JSON.stringify(userSignUp),
        // {'Content-Type':'application/json'}
        );
         if(!responseData){
            throw new Error('Falied Login')
         }
          
     
          dispatch(authActions.login({userId:responseData.userId,token:responseData.token}));
          navigate('/');

        }catch(error){

        }
   
    }
    const userLogin={
        email:enteredEmail.value,
        password:enteredPassword.value
       };
    const loginHandler=async(event)=>{
        event.preventDefault()
        try{

        const responseData= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`,
        'POST',
        JSON.stringify(userLogin),
        {'Content-Type':'application/json'});
       
        dispatch(authActions.login({userId:responseData.userId,token:responseData.token}));
     
        navigate('/');

        }catch(error){}

    }
   
   

   
    const switchbtn =  <Button type="submit" onClick={switchHandler}>
                         {!isLoginMode? 'Login' : 'SignUp'}
                     </Button>;
    
  return  <Container>
                {error&&<ErrorModal error={error} onClear={clearError}/>}
               
                {isLoadding && <LoadingSpinner asOverlay />}
                <form method='post' className={classes.form} onSubmit={isLoginMode?loginHandler:signUpHAndler}>
                    {isLoginMode ? <h2>Loggin Form</h2> : <h2>SignUp Form</h2> }
                    {!isLoginMode && <Input type="text"
                           id="name"
                           element="input"
                           label = "Name"
                           name="name" 
                           enteredValue={enteredName} 
                           onChangeValidaty={setEnteredName}
                           validators={[VALIDATOR_REQUIRE()]}
                           />}
                    {!isLoginMode && <UploadImage  
                                        id="image"
                                        name="image" 
                                        enteredValue={enteredImage} 
                                        onChangeValidaty={setEnteredImage} 
                                        />}
                    
                    <Input type="email"
                           element="input"
                           id="email"
                           label = "E-mail"
                           name="email" 
                           enteredValue={enteredEmail} 
                           onChangeValidaty={setEnteredEmail}
                           validators={[VALIDATOR_REQUIRE() , VALIDATOR_EMAIL()]}
                           />

                    <Input type="password"
                           element="input"
                           id="password"
                           label = "Password"
                           name="password" 
                           enteredValue={enteredPassword} 
                           onChangeValidaty={setEnteredPassword}
                           validators={[VALIDATOR_REQUIRE , VALIDATOR_MINLENGTH(6)]}
                           /> 
                        
                  
                    {switchbtn}
                     <Button type="submit" submit="success">
                       {isLoginMode ? 'Loggin' : 'SignUp' }
                     </Button>
                </form>
    </Container>
  
}


export default Auth