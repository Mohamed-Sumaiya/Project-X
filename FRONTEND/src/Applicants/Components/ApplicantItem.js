import React from 'react';

import './ApplicantItem.css';
import { Card } from '../../Shared/components/UIElements/Card';

export const ApplicantItem = props => {
  return (
    <li className='applicant-item'>
        <Card className='applicant-item__content'>
            <div className="applicant-item__info">
                <h3> <span className="applicant-item-info__heading"> Name: </span> &nbsp;{props.name} </h3>
                <h3> <span className="applicant-item-info__heading"> Surname: </span> &nbsp;{props.surname} </h3>
                <h3> <span className="applicant-item-info__heading"> Age: </span> &nbsp;{props.age} </h3>
            </div>
        </Card>
    </li>
  )
};