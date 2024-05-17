import React, { useState, useContext } from 'react';
import { Box, Button, Card, CardHeader, Divider, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

import { AuthContext } from '../../Shared/context/authenticate-context';

const ApplicantNewForm = () => {
   const auth = useContext(AuthContext);
   const [showNameError, setShowNameError] = useState(false);
   const [showSurnameError, setShowSurnameError] = useState(false);
   const [showAgeError, setShowAgeError] = useState(false);
   const [isFormValid, setIsFormValid] = useState(false);
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

      if(formData.name.length === 0){
        setShowNameError(true);
      }

      if(formData.surname.length  === 0){
        setShowSurnameError(true);
      }

      if(formData.age.length  === 0){
        setShowAgeError(true);
      }

      if(showNameError === false && showSurnameError === false && showAgeError === false){
        setIsFormValid(true)
      }

      if(isFormValid === true) {
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
            setError(responseData.error || 'Unknown error occurred!');
          }

        } catch (err) {
           setError("Something went wrong, could not create a new applicant.")
        }
      }
   };
  

   return (
      <div>
       {error && 
         <Card>
            <Typography variant="h5"> {error} </Typography>
         </Card>
        }
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
             error={showNameError === true}
             helperText= {showNameError === true ? "Please provide an applicant name." : ""}
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
             error={showSurnameError === true}
             helperText= {showSurnameError === true ? "Please provide an applicant surname.": ""}
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
             error={showAgeError === true}
             helperText= {showAgeError === true ? "Please provide an applicant age." : ""}
             value={formData.age}
             onChange={handleInputChange}
           />
            <br/>
            <Button type="submit" color="primary">
                  submit
            </Button>
           </Box>
         </form>
       </ Card>
      </div>
    
   )
};

export default ApplicantNewForm;