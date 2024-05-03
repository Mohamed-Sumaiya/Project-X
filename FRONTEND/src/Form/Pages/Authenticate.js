import React, { useState, useContext } from 'react';

import './Authenticate.css';
import { Card } from '../../Shared/components/UIElements/Card';
import { AuthContext } from '../../Shared/context/authenticate-context';

const Authenticate = () => {
  const auth = useContext(AuthContext);
  const [ isLogInMode, setIsLogInMode ] = useState(true);
  const [ formData, setFormData ] = useState({
    name:"",
    email:"",
    role:"",
    password:""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    auth.logIn();
    auth.authRole(formData.role);
    console.log(formData);
  };

  const swithModeHandler = event => {
    event.preventDefault();
    setIsLogInMode(prev => !prev);
  };


  return (
    <Card className="auth-form-wrapper">
       <div>
         <h1 className="auth-form-heading"> 
           {isLogInMode ? 'Log In required' : 'Sign Up required'}
         </h1>
         <form className="auth-form" onSubmit={handleSubmit}>
           {!isLogInMode && (
             <label className='auth-form-elements__input'>
               Name:
               <input  type="text" name="name" value={formData.name} onChange={handleInputChange} />
             </label>
           )}
           <label className='auth-form-elements__input'>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
           </label>
           <label className='auth-form-elements__input'>
              Role:
              <input type="text" name="role" value={formData.role}  onChange={handleInputChange} />
           </label>
           <label className='auth-form-elements__input'>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
           </label>
           <div className='auth-buttons-container'>
              <button type="submit" className='auth-form-elements__button'>
                {isLogInMode ? "LogIn" : "SignUp"}
              </button>
              <button onClick={swithModeHandler} className='auth-form-elements__button'>
                {isLogInMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}
              </button>
           </div>
         </form>
       </div>
    </Card>
  )
};

export default Authenticate;