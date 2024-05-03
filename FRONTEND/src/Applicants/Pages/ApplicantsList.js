import React from 'react';
import { Link } from 'react-router-dom';

import './ApplicantsList.css';
import { ApplicantItem } from '../Components/ApplicantItem';
import { Card } from '../../Shared/components/UIElements/Card';
import { Button } from '../../Shared/components/FormElements/Button';

const ApplicantsList = () => {

  let DUMMY_APPLICANTS;

  DUMMY_APPLICANTS = [
    {
      name: "Sumaiya",
      surname: "Mohamed",
      age: 20
    },

    {
      name: "Stephen",
      surname: "Ngago",
      age: 21
    }
  ]

  if(!DUMMY_APPLICANTS || DUMMY_APPLICANTS.length === 0){
    return (
      <Card>
        <h1> No applicants</h1>
      </Card>
    )
  }

   return(
    <>
      <ul className="applicants-list">
        {DUMMY_APPLICANTS.map( ( applicant, index ) => 
          ( 
            <ApplicantItem 
             key={index}
             name={applicant.name}
             surname={applicant.surname}
             age={applicant.age}
            />
          )
        )}
      </ul>
      <Button className="applicants-add-butn">
        <Link to="/"> ADD </Link>
      </Button>
    </>
   )
};

export default ApplicantsList;