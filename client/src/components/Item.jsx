import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MediaCard(props) {

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
    >
      <Link to= {`/singleProduct/${props.id}`}>
      <CardMedia
        component="img"
        sx={{
          // 16:9
          // pt: '56.25%',  
        }}
        image={props.image}
        alt={props.title}
      />
      </Link>
      <CardContent sx={{ flexGrow: 1 ,display:'flex', justifyContent:'space-between',cursor:'pointer'}}>
        <Typography gutterBottom variant="h5" component="h2" >
        {props.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" >
       ₹{props.price}
        </Typography>
      </CardContent>
    </Card>
  );
  }


