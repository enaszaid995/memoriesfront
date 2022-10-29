import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import classes from './user.module.css';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2';
import { NavLink } from 'react-router-dom';
export default function User(props) {
 
  const name = props.userDetails.name.substring(-1,1);
  

  return (
    <Container fixed >
           
           <Grid  >
           <NavLink to={`/posts/${props.userDetails.id}`} className={classes.navlink}>
                <Card  className={classes.user}>
                 
                    <CardHeader className={classes.header}
                        avatar={
                        <Avatar src={`${process.env.REACT_APP_ASSET_BACKEND}/${props.userDetails.image}`} alt= {name} sx={{ bgcolor: red[500] }} aria-label="recipe"/>
                   
                        
                        }
                    
                        title={props.userDetails.name}
                        subheader= {<Typography>
                        {props.userDetails.places.length}  places visit 
                        </Typography>}

                    
                      
                    />
               
            
            
            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                     <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
                <IconButton aria-label="share">
                      <DeleteForeverIcon/>
                </IconButton>
                
                
            </CardActions> */}
            
            </Card>
          </NavLink>
            </Grid>   
    </Container>
  );
}
