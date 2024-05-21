import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, List, Typography, Card, CircularProgress, Slide, Box } from '@mui/material';

import { ApplicantItem } from '../Components/ApplicantItem';
import { AuthContext } from '../../Shared/context/authenticate-context';
import { NavLink } from 'react-router-dom';
import { Check } from '@mui/icons-material';

const ApplicantsList = () => {
  const auth = useContext(AuthContext);
  const [applicants, setApplicants] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    if(auth.isDeleted === true){
      setTimeout(() => {
        auth.SetIsDeleted(false);
      }, 4000)
    }
   }, [auth])


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
         setIsLoading(false)
      } catch (err) {
         setError("Something went wrong, could not create a new applicant.");
         setIsLoading(false)
      }
    }
    fetchUsers();
  }, [])

   return(
    <>
      {isLoading && !error && !applicants &&
        <Box sx={{marginTop: 30, display: 'flex', justifyContent: 'center', alignItems:'center', minHeight: '40vh'}}>
           <CircularProgress center="true" color="primary" size={100}/>
        </Box>
      }
      {error && 
        <Card elevation={3} sx={{marginTop: 20, margin: 10, textAlign: 'center'}}>
           <Typography variant="h5"> {error} </Typography>
         </Card>
      }

      {!error && !isLoading && !applicants && 
         <Card elevation={3} sx={{marginTop: 20, margin: 10, textAlign: 'center'}}>
           <Typography variant="h5"> No applicants available.</Typography>
         </Card>}

      {!error && applicants &&  <List sx={{marginTop: 10, marginLeft: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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

      <Container sx={{marginTop: 2, marginLeft: 75, width: '50%'}}>
        <Button component={NavLink} to="/" color="primary" >
          <Typography color="primary"> ADD </Typography>
        </Button>
      </Container>
      </List>}
     
      {auth.isDeleted && 
           <Slide direction="right" in={auth.isDeleted} mountOnEnter unmountOnExit>
              <Card elevation={0} sx={{ width: {xs: '70%', md: '60%'}, backgroundColor: '#C7E7D9', padding: 1, display: 'flex', marginTop: 2, height: '40px' ,position: 'fixed', bottom: 0, left: 0, zIndex: 2}}>
                <Check color="success" />
                <Typography sx={{ marginLeft: 1}}> Deletion Successful! </Typography>
              </Card>
            </Slide>
      }
    
    </>
   )
};

export default ApplicantsList;