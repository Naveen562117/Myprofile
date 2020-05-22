 

import React from 'react';

import FormControl from './components/form-control';

const inputText = (props) => {
  return (
    <FormControl>
      <label htmlFor={props.inputName}>
        {props.labelName}
        {props.isRequired ? <span className="star">*</span> : null}
      </label>
      <input 
          type="text" 
          onChange={props.onInputChange} 
          name={props.inputName} 
          placeholder={props.placeholder} 
          className="input-element" 
          id={props.inputName} 
          required={props.isRequired}
      />
    </FormControl>
  );
};

export default inputText;
