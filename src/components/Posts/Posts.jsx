
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import ErrorModal from '../layouts/form/Error';
import LoadingSpinner from '../layouts/form/LoaddingSpinner';
import Post from './Post'

const Posts = () => {
   
  
  const params=useParams();
  const[loadedData,setLoadedData]=useState('');
  const {sendRequest,clearError,error,isLoadding}=useHttp();
  useEffect(()=>{
    const getPlaces=async()=>{
      try{
      const data= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${params.id}`);
      setLoadedData(data.places);
      }catch(err){
      
      }
      
    };
    getPlaces();
  },[sendRequest,params])
 
  return (
    
    <div style={{ width:"50%",margin:'auto'}}>
        {error && <ErrorModal error={error} onClear={clearError}/>}
        {isLoadding && <LoadingSpinner asOverlay />}
        {!loadedData && <h2 style={{margin:'auto' , textAlign:'center' , marginTop:'3rem'}}>No Placese Visit.</h2>}
        {loadedData && <h2 style={{margin:'auto' , textAlign:'center' , marginTop:'3rem'}}>Placese You Visit.</h2>}
        {loadedData&& loadedData.map(place =>
          <Post 
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          />
          )}
        
    </div>
  )
}

export default Posts