import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, ListItem, Divider, ButtonGroup, ListItemButton, ListItemIcon, Box, Icon, IconButton } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';


export const ApplicantItem = props => {

  const handleChangePage = (event) => {
    event.preventDefault();
  };

  return (
    <ListItem>
      <Card elevation={3} sx={{width: '90%', padding: 3}} >
        <Typography variant='h6'>  Name: &nbsp;{props.name}  </Typography> 
        <Divider/>
        <Typography variant='h6'>  Surname:  &nbsp;{props.surname} </Typography>
        <Divider />
        <Typography variant='h6'>  Age: &nbsp;{props.age} </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <IconButton onClick={handleChangePage}>
            <Link to={`/applicants/update/${props.id}`}> <EditOutlined /> </Link>
          </IconButton>
          <IconButton onClick={handleChangePage}>
            <Link to={`/applicants/delete/${props.id}`}> <DeleteOutlined /> </Link>
          </IconButton>
        </Box>
      </Card>
    </ListItem>
  )
};
