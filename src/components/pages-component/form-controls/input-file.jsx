 

import React from 'react';

import FormControl from './components/form-control';

const inputFile = (props) => {
  return (
    <FormControl>
      <label htmlFor={props.inputName}>
        {props.labelName}
        {props.isRequired ? <span className="star">*</span> : null}
      </label>
      <input type="file" onChange={props.onInputChange} name={props.inputName} className="input-element file-input" id={props.inputName} required={props.isRequired} accept=".pdf, .doc, .docx, .md, .rst"/>
    </FormControl>
  );
};

export default inputFile;