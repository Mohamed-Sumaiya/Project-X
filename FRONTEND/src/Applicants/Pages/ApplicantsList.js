import React from 'react';
import { Button, Container, List, Typography, Card } from '@mui/material';

import { ApplicantItem } from '../Components/ApplicantItem';


const ApplicantsList = () => {

  let DUMMY_APPLICANTS;

  DUMMY_APPLICANTS = [
    {
      name: "Sumaiya",
      surname: "Mohamed",
      age: 20
    },

    {
      name: "Stephen",
      surname: "Ngago",
      age: 21
    },

    {
      name: "Kyle",
      surname: "Leon",
      age: 21
    },

    {
      name: "Stephany",
      surname: "Williams",
      age: 21
    }
  ]

  if(!DUMMY_APPLICANTS || DUMMY_APPLICANTS.length === 0){
    return (
      <Card elevation='3' sx={{marginTop: 20, margin: 10, textAlign: 'center'}}>
        <h1> No applicants available</h1>
      </Card>
    )
  }

   return(
    <>
      <List sx={{marginTop: 10, marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {DUMMY_APPLICANTS.map( ( applicant, index ) => 
          ( 
            <Container sx={{marginTop: 1}}  key={index}>
              <ApplicantItem 
               name={applicant.name}
               surname={applicant.surname}
               age={applicant.age}
              />
            </Container>
          )
        )}
      </List>
      <Container sx={{display: 'flex', justifyContent: "center", marginTop: 2}}>
      <Button href="/" color="primary" >
        <Typography color="primary"> ADD </Typography>
      </Button>
      </Container>
    </>
   )
};

export default ApplicantsList;