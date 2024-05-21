import React, { useState, useContext} from 'react';
import { Box, Button, Card, CardHeader, Divider, TextField, Typography, Slide } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { blue } from '@mui/material/colors';

import { AuthContext } from '../../Shared/context/authenticate-context';
import { Check } from '@mui/icons-material';

const ApplicantNewForm = () => {
   const auth = useContext(AuthContext);
   const [message, setMessage] = useState('')
   const [error, setError] = useState("");
   const [formData, setFormData] = useState({
      name:"",
      surname:"",
      age: "",
   });
   
  
   const handleInputChange = event => {
      const { name, value } = event.target;
      setFormData({...formData, [name]: value}) // Copy and replace.
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await fetch('http://localhost:5000/api/applicants/create',
          {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: formData.name,
              surname: formData.surname,
              age: formData.age
            })
          }
          );
          
          const responseData = await response.json();
          if(!response.ok) {
            setError(responseData.message || 'Unknown error occurred!');
          }

          if(response.ok) {
            setError('');
            setMessage('Successfully added an applicant!');
            setTimeout(() => {
              setMessage('');
            }, 3000);
          }

        } catch (err) {
           setError("Something went wrong, please try again later!")
        }
   };
  

   return (
      <div>
       <Card elevation={4} sx={{ marginTop: 18, marginLeft: '7.5%', width: '85%'}}>
         <CardHeader
           title = {
                <Typography variant="h4"> Applicant Form </Typography>
           }
           sx={{
               textAlign: "center"
           }}
         />
         <Divider variant="middle" sx={{ backgroundColor: blue[500]}}/>
         <form onSubmit={handleSubmit}>
           <Box sx={{display: 'flex', flexDirection: 'column', justifyItems: 'center', paddingRight: 5, marginTop: 5, marginLeft: 6}} >
           <TextField
             type ="text"
             name ="name"
             label = "Name"
             variant="outlined"
             color="primary"
             value={formData.name}
             onChange={handleInputChange}
           />
            <br/>
            <TextField
             type ="text"
             name ="surname"
             label = "Surname"
             variant="outlined"
             color="primary"
             value={formData.surname}
             onChange={handleInputChange}
           />
            <br/>
            <TextField
             type ="number"
             name ="age"
             label = "Age"
             variant="outlined"
             color="primary"
             value={formData.age}
             onChange={handleInputChange}
           />
              {error && 
             <Slide direction="right" in={!!error} mountOnEnter unmountOnExit>
                <Card elevation={0} sx={{ width: {xs: '70%', md: '75%'}, backgroundColor: 'rgba(255, 0, 0, 0.1)', padding: 1, display: 'flex', marginTop: 2, height: '40px' }}>
                  <ErrorOutlineIcon color="error"/>
                  <Typography sx={{ marginLeft: 1}}> {error} </Typography>
                </Card>
             </Slide>
           }
            <br/>
            <Button type="submit" color="primary">
                  submit
            </Button>
           </Box>
         </form>
       </ Card>
        {message && 
             <Slide direction="right" in={!!message} mountOnEnter unmountOnExit>
                <Card elevation={0} sx={{ width: {xs: '70%', md: '60%'}, backgroundColor: '#C7E7D9', padding: 1, display: 'flex', marginTop: 2, height: '40px', position: 'fixed', bottom: 0, left: 0, zIndex: 2 }}>
                  <Check color="success" />
                  <Typography sx={{ marginLeft: 1}}> {message} </Typography>
                </Card>
             </Slide>
           }
        
      </div>
    
   )
};

export default ApplicantNewForm;