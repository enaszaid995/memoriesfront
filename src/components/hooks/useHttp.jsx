import { useCallback, useState } from 'react';

export const useHttp=() => {
    //const[loadedData , setLoadedData]=useState({});
    const [error,setError]=useState(null);
    const [isLoadding,setIsLoadding]=useState(false);
    const sendRequest=useCallback(async(url,method='GET', body=null, headers={})=>{
        try{

            setIsLoadding(true);
        const response = await fetch(url,{
            method,
            body,
            headers,
        });  
        
        const responseData=await response.json().then((data) => {
            //   dispatch(authActions.login(data.user.id));
           // setLoadedData(data);
              return data;
                    
             });
             
            if (!response.ok) {
                 throw new Error(responseData.message);
                  
            }
             setIsLoadding(false);
        return responseData;

        }catch(error){
            setError(error.message)
            setIsLoadding(false)
            
        }
   
    },[]);

    const clearError=()=>{
        setError(null)
    }

    return {sendRequest ,clearError,error,isLoadding}
}