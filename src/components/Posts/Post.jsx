import React ,{useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import classes from './post.module.css';
import EditIcon from '@mui/icons-material/Edit';
import {  useNavigate } from 'react-router-dom';
import Button from '../layouts/form/Button';
import Modal from '../layouts/form/Modal';
import Map from '../layouts/form/Map.js';
import { useHttp } from '../hooks/useHttp';
import { useSelector } from 'react-redux';
import ErrorModal from '../layouts/form/Error';
import LoadingSpinner from '../layouts/form/LoaddingSpinner';
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function Post(props) {
  const navigate = useNavigate();
  
  const auth = useSelector((state) => state.auth);
   
  //const [expanded, setExpanded] = React.useState(false);
  const [showMap, setShowMap] = useState(false);
  const placeId =props.id;
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const {sendRequest,clearError,error,isLoadding}=useHttp();
  const deleteHandler = async() =>{
    
    await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization:'Bearer '+auth.token,
        }
    )
      navigate('/');
    
  }
 
  const editHandler=()=>{
    navigate(`/posts/update/${placeId}`);
  }

  return ( <Container>
    {error && <ErrorModal error={error} onClear={clearError}/>}
    {isLoadding && <LoadingSpinner asOverlay />}
     <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        
          <Map center={props.coordinates} zoom={16} />
        
      </Modal>


         
                    <Card className={classes.post}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {props.creator}
                        </Avatar>
                        }
                        
                        title={props.title}
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        width="200"
                        image={`${process.env.REACT_APP_ASSET_BACKEND}/${props.image}`}
                        alt={props.title}
                        
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                       {props.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton> */}
                        {/* <Form  className={classes.form} method='POST' action='/post/comment'>
                            <input type='text' placeholder='Add Your Comment...' />
                            <input type='submit' value='Add'/>
                        </Form> */}
                        <div className={classes.viewMap}>
                          <Button inverse onClick={openMapHandler} >
                            VIEW ON MAP
                          </Button>
                        </div>
                        
                        {/* {auth.isLoggedIn && (
                          <Button to={`/places/${props.id}`}>EDIT</Button>
                        )} */}
                        {/* <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        
                        </ExpandMore>
                        <Typography sx={{color:"gray"}} >  Comments</Typography> */}
                        {auth.authId === props.creatorId && 
                        <IconButton aria-label="edit" onClick={editHandler}>
                        <EditIcon  />
                        </IconButton>
                        }
                         {auth.authId  === props.creatorId && 
                        <IconButton aria-label="Delete" onClick={deleteHandler}>
                        <DeleteIcon />
                        </IconButton>
                        }
                    </CardActions>
                    {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>Comments:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                            aside for 10 minutes.
                        </Typography>
                        
                       
                        
                        </CardContent>
                    </Collapse> */}
                    </Card>
       
        </Container>
   
  );
}
