import React from 'react';
import { Typography, Card, ListItem, Divider } from '@mui/material';


export const ApplicantItem = props => {
  return (
    <ListItem>
      <Card elevation={3} sx={{width: '90%', height: 150, padding: 3}} >
        <Typography variant='h6'>  Name: &nbsp;{props.name}  </Typography> 
        <Divider/>
        <Typography variant='h6'>  Surname:  &nbsp;{props.surname} </Typography>
        <Divider />
        <Typography variant='h6'>  Age: &nbsp;{props.age} </Typography>
      </Card>
    </ListItem>
  )
};
