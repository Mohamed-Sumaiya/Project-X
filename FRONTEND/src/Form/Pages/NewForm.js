import React, { useState } from 'react';

import './NewForm.css';
import { Card } from '../../Shared/components/UIElements/Card';

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
      <Card className="form-wrapper">
         <h1 className="form-heading"> Applicant form </h1>
         <form className='form' onSubmit={handleSubmit}>
            <label className='form-elements__input'>
               Name:
               <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <label className='form-elements__input'>
               Surname:
               <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
            </label>
            <label className='form-elements__input'>
               Age:
               <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
            </label>

            <button type="submit" className="form-elements__button">
                  submit
            </button>
         </form>
       </Card>
 
    
   )
};

export default NewForm;