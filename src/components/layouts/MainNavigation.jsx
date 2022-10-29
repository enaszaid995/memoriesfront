import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Toolbar} from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';

export default function MainNavigation() {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth.isAuth);
  
  const logoutHAndler =()=>{
       
    dispatch(authActions.logout());
          }
  
  return (
    <Container fixed>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MEMORIES
          </Typography>
          <div className={classes.links}>
                
                    <NavLink className={classes.navlink} to={'/'}>
                        All User
                    </NavLink>
                
                    {auth && <NavLink  className={classes.navlink} to={'/newplaceForm'}>
                        Create Post
                    </NavLink>}
                 
                    {!auth && <NavLink  className={classes.navlink} to={'/auth'}>
                    Login
                    </NavLink>}
                
                   {auth &&  <NavLink className={classes.navlink}  to={'/auth'} onClick={logoutHAndler}>
                    Log-out
                    </NavLink>
                    }
              
          </div>
          {/* <Button color="inherit">
            All User
          </Button>
          <Button color="inherit">Create Post</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Log-out</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
    </Container>
  );
}
