import React, { useState, useCallback, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ApplicantNewForm from './Applicants/Pages/ApplicantNewForm';
import Authenticate from './User/Pages/Authenticate';
import ApplicantsList from './Applicants/Pages/ApplicantsList';
import { AuthContext } from './Shared/context/authenticate-context';
import { Layout } from './Shared/components/Navigation/Layout';
import UpdateApplicant from './Applicants/Pages/UpdateApplicant';
import DeleteApplicant from './Applicants/Pages/DeleteApplicant';
import { CircularProgress } from '@mui/material';

function App() {
 const [token, setToken] = useState("");
 const [userId, setUserId] = useState("");
 const [isDeleted, setIsDeleted] = useState(false);
 const [role, setRole] = useState("");

  // This useEffect will automatically log the user in if a token is detected even after they refresh the page.
  useEffect(()=> {
    // Check if the user is alreday logged in when the component mounts.
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem(`userToken_${storedUserId}`); // This represents the token for the specific user so that the correct token is retrieved if there is one.
    const storedRole = localStorage.getItem(`userRole_${storedUserId}`) // This represents a specific user role using their id.
     
    if (storedUserId && storedToken && storedRole){
      setUserId(storedUserId);
      setToken(storedToken);
      setRole(storedRole)
    } else {
      setUserId(null);
      setToken(null);
      setRole(null);
    }
    
    console.log(storedRole, storedToken, storedUserId)
  }, [])

  // Will only be rendered once.
  const logIn = useCallback((userId, token, role) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem(`userToken_${userId}`, token); // unique way to find the correct users token if it exists.
    localStorage.setItem(`userRole_${userId}`, role); // unique way to find the correct user role if it exists.
    setUserId(userId);
    setToken(token);
    setRole(role)
    console.log(role)
  }, []);

  const logOut = useCallback((userId) => {
     localStorage.removeItem('userId');
     localStorage.removeItem(`userToken_${userId}`);
     localStorage.removeItem(`userRole_${userId}`)
     setUserId(null);
     setToken(null);
     setRole(null)
  }, []);

  const SetIsDeleted = (isDeleted) => {
    setIsDeleted(isDeleted)
  }


const isAdmin = token && (role.toLowerCase() === 'admin' || role.toLowerCase() === 'administrator');  
 
 return (
   <AuthContext.Provider value={{ role: role, logIn: logIn, logOut: logOut, token: token, userId: userId, isDeleted: isDeleted, SetIsDeleted: SetIsDeleted}}> 
      <BrowserRouter>
      
      <Layout>
        <Routes>
         { token && <Route path="/" exact element={ <ApplicantNewForm/> } />}  {/* Dont forget to test for invalid routes when the user is able to stay logged In. */}    
         { token && <Route path="*" element={ < ApplicantNewForm />} />}
         { isAdmin && (
           <>
            <Route path="/applicants" exact element={ <ApplicantsList /> }/>
            <Route path="/applicants/update/:applicantId" exact element={ <UpdateApplicant /> }/>
            <Route path="/applicants/delete/:applicantId" exact element={ <DeleteApplicant /> }/>
           </>
          )}
         { !token && <Route path="/auth" exact element={ <Authenticate /> } /> }
         { !token && <Route path="*" element={ <Authenticate /> }/>}
        </Routes>
      </Layout>
   </BrowserRouter>

   </AuthContext.Provider>
  );
}

export default App;
