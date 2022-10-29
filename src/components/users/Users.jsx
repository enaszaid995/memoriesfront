import React ,{useEffect, useState}from 'react'
import User from './User'
import classes from './users.module.css';
import usePaginationn from "../layouts/Pagination.js";
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2';
import { useHttp } from '../hooks/useHttp';

import LoadingSpinner from '../layouts/form/LoaddingSpinner';

const Users = () => {
    
    let [page, setPage] = useState(1);
    const[loadedData,setLoadedData]=useState('');
    const {sendRequest,  isLoadding}=useHttp();
  const PER_PAGE = 5;

  const count = Math.ceil(loadedData.length / PER_PAGE);
  const _DATA =usePaginationn(loadedData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  useEffect(()=>{
    const getUser=async()=>{
      try{
        
      const data= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`);
      setLoadedData(data.users);
      }catch(err){  }
      
    };
    getUser();
  },[sendRequest])
   
  
  return (
    <Container>
        
               
         {isLoadding && <LoadingSpinner asOverlay />}
         <Grid>

         
        
         <div className={classes.allUsers}>
          {loadedData.length === 0 &&<h2>No users found.</h2>}
          {loadedData&& _DATA.currentData().map(user =>{
            return <User key={user.id} userDetails={user}/>
          })}
          
        </div>
        <Box sx={{
         display: 'flex',
         justifyContent: 'center',
        
        }}>
          

            <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    color="secondary"
                    shape="rounded"
                    onChange={handleChange}
                />
        </Box>
        </Grid>
  
      
    
    </Container>
  )
}

export default Users;