import React, {  useState } from 'react'

import Container from '@mui/material/Container';
import Input from '../layouts/form/Input';
import Button from '../layouts/form/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
  } from '../layouts/validate/validators';
import { useHttp } from '../hooks/useHttp';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorModal from '../layouts/form/Error';
import LoadingSpinner from '../layouts/form/LoaddingSpinner';
const UpdatedPlaceForm = () => {

    const params = useParams();
    const placeId = params.id;
   const auth = useSelector((state) => state.auth);

  const navigate=useNavigate();
 
   const[enteredTitle,setEnterTitle]= useState({
    value:'',
    isValid:false
  });
  const[enteredDescription,setEnteredDescription]= useState({
    value:'',
    isValid:false
  });
  
   const {sendRequest,error,isLoadding,clearError} = useHttp();

   const updatedPlace = {
    title:enteredTitle.value,
    description:enteredDescription.value,
   
   }
  const newPlaceHandler=async(event)=>{
    event.preventDefault();
     await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        'PATCH',
        JSON.stringify(updatedPlace),
        {'Content-Type':'application/json',
        Authorization:'Bearer '+auth.token});
    
  
     navigate('/');

  }
  return (
    <Container>
         {error && <ErrorModal error={error} onClear={clearError}/>}
        {isLoadding && <LoadingSpinner asOverlay />}
        <form onSubmit={newPlaceHandler} className="place-form">
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
      
      
      <Button type="submit" disabled={!(enteredTitle.isValid && enteredDescription.isValid )}>
        ADD PLACE
      </Button>
        </form>
    </Container>
  )
}

export default UpdatedPlaceForm