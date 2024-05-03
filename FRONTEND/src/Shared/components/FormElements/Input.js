import React, { useReducer } from 'react';

import './Input.css';
import { validate } from '../../utils/validators';

const initialState = {
   value: '',
   isTouched: false,
   isValid: false
};

const reducer = (state, action) => {
    switch(action.type){
        case 'CHANGE': {
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators) // this will return true or false.
            }
        };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        };
        default:
            return state;

    }
};

export const Input = props => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const changeHandler = event => {
      // This will store the value and validate it.
      dispatch({
        type: 'CHANGE',
        val: event.target.value,
        validators: props.validators
      })
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    };

    const element = props.element;

    return (
        <div className={`form-control ${!state.isValid && state.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.name}>
               {props.label}
            </label>
            {element === 'input' && (
                <input 
                  name={props.name}  
                  type={props.type} // This is for the input type e.g password,email.
                  onChange={changeHandler}
                  onBlur={touchHandler}
                  value={state.value}
                />
            )}
            {!state.isValid && state.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}
