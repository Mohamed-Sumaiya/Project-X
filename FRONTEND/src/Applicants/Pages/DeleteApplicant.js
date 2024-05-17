import React, {useState, useContext} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Card, Button, CardHeader, Divider, CardContent } from '@mui/material';

import { AuthContext } from '../../Shared/context/authenticate-context';

const DeleteApplicant = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState();
    
    const applicantId = useParams().applicantId;
    
    let response;

    const handleDelete = async (event) => {
      event.preventDefault();
       try {
        response = await fetch(`http://localhost:5000/api/applicants/${applicantId}`, 
        {
          method:  'DELETE',
          headers: {
              Authorization: 'Bearer ' +  auth.token
          }   
        });
        
         const responseData = await response.json();

         if(!response.ok){
            setError(responseData.message)
         }
       } catch (err) {
          setError('Something went wrong , could not delete applicant data.')
       }
       
       navigate('/applicants');
    }

    return (
        <Box sx={{marginTop: 25, width: '70%', marginLeft: 12}}>
            <Card elevation={3} sx={{padding: 3, textAlign: 'center' }}>
                <CardHeader title={<Typography variant="h4" color="error"> Deletion in progress.. </Typography>} />
                <Divider />
               <CardContent sx={{textAlign: 'center'}}>
                <Typography variant="h5"> Are you sure you would like to delete this applicant?</Typography>
                <br/>
                <Typography variant="h7"> Please note that this cannot be undone!</Typography>

                <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 2}}>
                    <Button variant="outlined"  sx={{ textDecoration: 'none'}}> <Link to="/applicants"> Cancel </Link> </Button> {/* Test to see if the path changes as well */}
                    <Button variant= "contained" color="error" type="submit" onClick={handleDelete}> Delete </Button>
                </Box>
               </CardContent>
            </Card>
        </Box>
    )
}

export default DeleteApplicant;