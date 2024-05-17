import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, List, Typography, Card } from '@mui/material';

import { ApplicantItem } from '../Components/ApplicantItem';
import { AuthContext } from '../../Shared/context/authenticate-context';
import { Link, NavLink } from 'react-router-dom';


const ApplicantsList = () => {
  const auth = useContext(AuthContext);
  const [applicants, setApplicants] = useState();
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
         const responseData = await fetch('http://localhost:5000/api/applicants',
          {
            headers: {
              Authorization: 'Bearer ' + auth.token,
            }
          }
         )
         const data = await responseData.json();
         setApplicants(data.applicants);
         console.log(data)
      } catch (err) {
         setError("Something went wrong, could not create a new applicant.");
      }
    }
    fetchUsers();
  }, [])

  const handleChangePage = event => {
    event.preventDefault();
  }

   return(
    <>
      {!applicants &&  
         <Card elevation={3} sx={{marginTop: 20, margin: 10, textAlign: 'center'}}>
           <Typography variant="h5"> No applicants available.</Typography>
         </Card>}
      {error && 
        <Card elevation={3} sx={{marginTop: 20, margin: 10, textAlign: 'center'}}>
           <Typography variant="h5"> {error} </Typography>
         </Card>
      }

      {!error && applicants &&   <List sx={{marginTop: 10, marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        { applicants.map( ( applicant, index ) => 
          ( 
            <Container sx={{marginTop: 1}}  key={index}>
              <ApplicantItem 
               name={applicant.name}
               surname={applicant.surname}
               age={applicant.age}
               id={applicant.id}
              />
            </Container>
          )
        )}
      </List>}
      <Container sx={{display: 'flex', justifyContent: "center", marginTop: 2}}>
      <Button component={NavLink} to="/" color="primary" >
        <Typography color="primary"> ADD </Typography>
      </Button>
      </Container>
    </>
   )
};

export default ApplicantsList;