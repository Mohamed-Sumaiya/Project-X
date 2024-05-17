import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader,Typography, Divider, Box, Container, Button, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';

import { AuthContext } from '../../Shared/context/authenticate-context';
import { Users } from '../../Shared/utils/Users';

const Authenticate = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [ formData, setFormData ] = useState({
    email:"",
    role:"",
    password:""
  });

  const validateEmail = email => {
    // Regular expression used for email validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

/*  const handleValidation = (user, email, password) => {

    if(!user && formSubmitted === true){
      setEmailError(true)
      setEmailErrorMessage('User does not exist.');
      return
    }

    if(!user){
      setEmailError(true);
      setEmailErrorMessage('Please enter your email.');
      return
    }

    if(user.password !== password){
      setPasswordError(true);
      setPasswordErrorMessage('Incorrect Password!')
      return
    } 

    if( user.email === email  && user.password === password ){
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  
  };
 */ 
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    
    
    if(name === 'email'){
      setEmailError(!validateEmail(value)) // Because the function returns a true value if the email is the correct format, we don't need to show an error and therefore if its true we will set the error to false and if its false we will set the error to true.
      setEmailErrorMessage('Please enter a valid email.')
    };
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true)
    
       try {
         const response = await fetch('http://localhost:5000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // the border-paser will need this.
          },
          body: JSON.stringify({ // body data type must match "Content-Type" header.
               email: formData.email,
               password: formData.password
          })
         });
        
         const responseData = await response.json();
         if(!response.ok){
           setError(responseData.error || 'Unknown error occurred!');
         }
         
        // handleValidation(responseData, formData.email, formData.password)
            //auth.authRole(responseData.user.role);
            auth.logIn(responseData.user.id, responseData.token, responseData.user.role);
             console.log(responseData.user.id, responseData.token, responseData.user.role)
            navigate('/');
       } catch (err) {
          setError("Something went wrong, could not log you in.")
       }
    
  };



  return (
    <div>
       {error && 
         <Card>
            <Typography variant="h5"> {error} </Typography>
         </Card>
       }
       {!error && 
         <Card sx={{ marginTop: 18, marginLeft: '7.5%', border: 'solid', borderWidth: 2, borderColor: blue[500], width: '85%', height: 350}} >
         <CardHeader 
           title= {
               <Typography variant="h4"> Log In Required</Typography>
           }
           sx={{
              textAlign: "center",
           }}
         />
         <Divider variant='middle' sx={{ backgroundColor: blue[500]}}/>
         <form noValidate  onSubmit={handleSubmit}>
           <Box sx={{display: 'flex', flexDirection: 'column', justifyItems: 'center', paddingRight: 5, marginTop: 5, marginLeft: 6}}>
           <TextField
             name="email"
             value={formData.email}
             label="Email"
             variant="outlined"
             color="primary"
             required
             error={emailError}
             helperText={emailError ? `${emailErrorMessage}`: ''}
             onChange={handleInputChange}
           />
           <br/>
           <TextField
             name="password"
             type="password"
             value={formData.password}
             label="Password"
             variant="outlined"
             color="primary"
             required
             error={passwordError === true}
             helperText={passwordError === true ? `${passwordErrorMessage}` : ''}
             onChange={handleInputChange}
           />
           
           <Container sx={{marginTop: 3, display: 'flex', justifyContent: 'center'}}>
              <Button type="submit" variant="contained">
                Log In
              </Button>
           </Container>
           </Box>
         </form>
       </Card>
       
       }
    </div>
  )
};

export default Authenticate;