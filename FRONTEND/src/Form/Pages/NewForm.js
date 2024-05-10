import React, { useState } from 'react';
import { Box, Button, Card, CardHeader, Divider, TextField, Typography } from '@mui/material';

import { blue } from '@mui/material/colors';


const NewForm = () => {
   const [formData, setFormData] = useState({
      name:"",
      surname:"",
      age: "",
   });
   
   const handleInputChange = event => {
      const { name, value } = event.target;
      setFormData({...formData, [name]: value}) // Copy and replace.
   };

   const handleSubmit = event => {
      event.preventDefault();
      console.log(formData)
   };
  

   return (
      <div>
       <Card elevation={4} sx={{ marginTop: 18, marginLeft: '7.5%', width: '85%', height: 420}}>
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

export default NewForm;