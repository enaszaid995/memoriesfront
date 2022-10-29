import React, { useState } from 'react'

import Container from '@mui/material/Container';
import Input from '../layouts/form/Input';
import Button from '../layouts/form/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
  } from '../layouts/validate/validators';
import { useHttp } from '../hooks/useHttp';
import { useSelector } from 'react-redux';
//import { authActions } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../layouts/form/UploadImage';
import ErrorModal from '../layouts/form/Error';
import LoadingSpinner from '../layouts/form/LoaddingSpinner';


const NewPlace = () => {
  //const dispatch=useDispatch();
 const navigate=useNavigate();
  const auth = useSelector((state) => state.auth);
   const[enteredTitle,setEnterTitle]= useState({
    value:'',
    isValid:false
  });
  const[enteredDescription,setEnteredDescription]= useState({
    value:'',
    isValid:false
  });
  const[enteredAddress,setEnteredAddress]= useState({
    value:'',
    isValid:false
  });
  const [enteredImage , setEnteredImage] =useState({
    value:'',
    isValid:false
});

   const {sendRequest,clearError,error,isLoadding} = useHttp();
   const formData =new FormData();
   formData.append('title',enteredTitle.value);
   formData.append('description',enteredDescription.value);
   formData.append('address',enteredAddress.value);
   formData.append('image',enteredImage.value);

  //  const createdPlace = {
  //   title:enteredTitle.value,
  //   description:enteredDescription.value,
  //   address:enteredAddress.value,
  //   creator:auth
  //  }
  const newPlaceHandler=async(event)=>{
    event.preventDefault();
    try{
      
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/`,
        'POST',
        formData,
        {
          Authorization:'Bearer '+auth.token,
        }
        // JSON.stringify(createdPlace),
        // {'Content-Type':'application/json'}
        );
    

      //dispatch(authActions.login(responseData.user.id));
     navigate('/');
    }catch(err){}

  }
     
  return (
    <Container>
        {error && <ErrorModal error={error} onClear={clearError}/>}
        {isLoadding && <LoadingSpinner asOverlay />}
        <form method='POST' onSubmit={newPlaceHandler} className="place-form">
     <Input
        name='title'
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        enteredValue={enteredTitle} 
        onChangeValidaty={setEnterTitle}
      />
      
      
          
      <Input
       name='descrption'
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(6)]}
        enteredValue={enteredDescription} 
        onChangeValidaty={setEnteredDescription}
      />
      
      <Input
        name='address'
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        enteredValue={enteredAddress} 
        onChangeValidaty={setEnteredAddress}
      /> 
      <UploadImage  
        id="image"
        name="image" 
        enteredValue={enteredImage} 
        onChangeValidaty={setEnteredImage} 
        />
                    
      <Button type="submit" disabled={!(enteredTitle.isValid && enteredDescription.isValid && enteredAddress.isValid)}>
        ADD PLACE
      </Button>
        </form>
    </Container>
  )
}

export default NewPlace