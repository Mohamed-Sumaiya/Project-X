import React, { useState, useEffect, useContext} from 'react';
import { Card, CardHeader, Typography, Divider, Box,TextField, Button, ButtonGroup } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Link, useParams } from 'react-router-dom';

import { AuthContext } from '../../Shared/context/authenticate-context';

const UpdateApplicant = () => {
    const auth = useContext(AuthContext);

    const [showNameError, setShowNameError] = useState(false);
    const [showSurnameError, setShowSurnameError] = useState(false);
    const [showAgeError, setShowAgeError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loadedApplicant, setLoadedApplicant] = useState();
    const [formData, setFormData] = useState({
       name:"",
       surname:"",
       age: "",
    });

    const applicantId = useParams().applicantId;

    useEffect(() => {
      const fecthApplicantData = async () => {
          try {
             const response = await fetch(`http://localhost:5000/api/applicants/${applicantId}`,
             {
              headers: {
                  Authorization: 'Bearer ' + auth.token,
              }
             }
             );

             if(Response.type === 'cors'){
              console.warn('CORS response recieved but request succeeded.')
             }

             const responseData = await response.json()
             setLoadedApplicant(responseData.applicant);
             console.log(responseData.applicant)
          } catch (err) {
            setError('Something went wrong could not find applicant original information.')
          }
      };
      fecthApplicantData();
    
    }, [applicantId]);
    
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
 
       if(isFormValid === true){
         setIsFormSubmitted(true)

         try {
           await fetch(`http://localhost:5000/api/applicants/${applicantId}`,
            { 
              method: 'PATCH',
              headers: {
              'Content-Type': 'application/json', 
               Authorization: 'Bearer '+ auth.token 
             },
             body: JSON.stringify({
                name: formData.name,
                surname: formData.surname,
                age: formData.age
             })
            }
           )
         } catch (error) {
          setError('Something went wrong could not update applicant data.')
         }
       }
    };

    return (
       <div>
        <Card elevation={4} sx={{ marginTop: 18, marginLeft: '7.5%', width: '85%'}}>
          <CardHeader
            title = {
                 <Typography variant="h4"> Update Applicant Form </Typography>
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
              placeholder={loadedApplicant && loadedApplicant.name}
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
              placeholder={loadedApplicant && loadedApplicant.surname}
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
              placeholder={loadedApplicant && loadedApplicant.age.toString()}
            />
             <br/>
             <Box variant="text" sx={{display: 'flex', justifyContent: "space-evenly", padding: 1}}>
                <Link to="/applicants"> 
                 <Button color="primary">
                   cancel
                 </Button>
                </Link>
               <Button type="submit" color="primary">
                   submit
               </Button>
             </Box>
            </Box>
          </form>
        </ Card>
       </div>
     
    )
};

export default UpdateApplicant;