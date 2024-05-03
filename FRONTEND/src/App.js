import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import MainNavigation from './Shared/components/Navigation/MainNavigation'
import NewForm from './Form/Pages/NewForm';
import Authenticate from './Form/Pages/Authenticate';
import ApplicantsList from './Applicants/Pages/ApplicantsList';
import { AuthContext } from './Shared/context/authenticate-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const authRole = useCallback( (role) => {
    setRole(role);
    console.log(role.trim().toLowerCase());
  })

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
    console.log("Logged In!")
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  /*// Added this useEffect to navigate the user to the authentication page when the app starts.
  useEffect(() => {
   if(!isLoggedIn){
     navigate('/auth', {replace: true});
   }
   return null
  }, [isLoggedIn]);
*/

 const isAdmin = isLoggedIn && (role.trim().toLowerCase() === 'admin' || role.trim().toLowerCase() === 'administrator');  // wrapped the role checks in parenthesis to ensure that they are evaluated together.
 
 return (
   <AuthContext.Provider value={{isLoggedIn: isLoggedIn, role: role, authRole: authRole, logIn: logIn, logOut: logOut}}>
      <BrowserRouter>
      <MainNavigation /> {/*Render it above the other routes so that it's always available.*/}
      <main>
        <Routes>
         { isLoggedIn && <Route path="/" exact element={ <NewForm/> } />}  {/* Dont forget to test for invalid routes when the user is able to stay logged In. */}    
         { isAdmin &&  <Route path="/applicants" exact element={ <ApplicantsList /> }/>}
         { !isLoggedIn && <Route path="/auth" exact element={ <Authenticate /> } /> }
         <Route path="*" element={ <Authenticate /> }/>
        </Routes>
      </main>
   </BrowserRouter>
   </AuthContext.Provider>
  );
}

export default App;
