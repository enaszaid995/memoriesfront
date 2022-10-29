

import React, { useRef, useState } from 'react'
import { validate } from '../validate/validators';
import './Input.css'
const Input =(props) => {
  const inputRef =useRef('');
  
  const ErrorMsg = `Enter Valid ${props.name}`;
  const element = props.element;
  const [isTouch , setIsTouch]=useState(false);
  // const isValid = props.isValid;
  const changeHandler=()=>{
    const inputValue = inputRef.current.value;
    props.onChangeValidaty(prevState => ({...prevState , value:inputValue,
      isValid:validate(inputValue,props.validators)}));
    
  }

  
  
      
  const touchHandler=()=>{
    setIsTouch(true);
  }
  return (
    <>
    <div key={props.id} 
        className={`form-control ${!props.enteredValue.isValid && isTouch &&
            'form-control--invalid'}`}>
        <label>{props.label}</label>
        {element === 'input' && <input type={props.type}
               name={props.name}
               ref={inputRef}
               value={props.enteredValue.value}
               placeholder={`Enter Your ${props.name}`}
               onBlur={touchHandler}
               onChange={changeHandler}
               /> 
        }
        {element === 'textarea' && 
            <textarea
            rows={props.rows || 3}
            name={props.name}
            ref={inputRef}
            value={props.enteredValue.value}
            placeholder={`Enter Your ${props.name}`}
            onBlur={touchHandler}
            onChange={changeHandler}
          />
      }
       
        {!props.enteredValue.isValid && isTouch &&<p>{ErrorMsg}</p>}
               
    </div>
  
  </>
  )
}

export default Input

















// import React, { useState, useRef } from 'react';
// import { validate } from '../validate/validators';
// import './Input.css';

// const Input =(props)=>{
    
//     const inputRef= useRef();
//     const inputValue = inputRef.current.value;
//     const [isTouch , setIsTouch]=useState(false);
//     const [isValid , setIsValid]=useState(false);
//     const changeHandle =()=>{
//       setIsValid(validate(inputValue, props.validators))
//     }
//     const touchHandle =() =>{
//       setIsTouch(true);
//     }
//     const element = props.type === 'input' ? 
//                     <input 
//                     type={props.type}
//                     id={props.id}
//                     name={props.id}
//                     ref={inputRef}
//                     value={inputValue}
//                     validators = {props.validators}
//                     errorMsg={props.errorMsg}
//                     onBlur={touchHandle}
//                     onChange={changeHandle}
//                     />  
//                     : <textarea/>;
//     return (
//       <div
//        className={`form-control ${!isValid && isTouch &&
//         'form-control--invalid'}`}
//     >
//         <label htmlFor={props.id}>{props.label}</label>
//       {element}
//     </div>
//     )
    
        
   
// }

// const Input = props => {
//   const inputValue = useRef();
//   const realInputValue = inputValue.current.value;

 
//   const element =
//     props.element === 'input' ? (
//       <input
//         name={props.name}
//         id={props.id}
//         type={props.type}
//         placeholder={props.placeholder}
//         value={inputValue}
//         onBlur={touchHandler}
       
//       />
//     ) : (
//       <textarea
//         id={props.id}
//         rows={props.rows || 3}
       
//         onBlur={touchHandler}
      
//       />
//     );

//   return (
//     <div
//       className={`form-control ${!inputState.isValid && inputState.isTouched &&
//         'form-control--invalid'}`}
//     >
//       <label htmlFor={props.id}>{props.label}</label>
//       {element}
//       {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
//     </div>
//   );
// };

// export default Input;
