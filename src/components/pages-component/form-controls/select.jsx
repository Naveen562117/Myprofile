 

import React from 'react';

import FormControl from './components/form-control';

const select = (props) => {
  // const options = [];

  // for (let i = 0; i < props.options.length; i++) {
  //   options.push(
  //     <option value={props.options[i]} key={'option_' + i}>{props.options[i]}</option>
  //   );
  // }

  const options = props.options.map(option => {
    if (props.type === 'countryCode') {
      return (
        <option value={option.value} key={option.id}>{option.id + ', ' + option.value}</option>
      );
    } else {
      return (
        <option value={option.value} key={option.id}>{option.value}</option>
      );
    }
  });

  return (
    <FormControl>
      <label htmlFor={props.inputName}>
        {props.labelName}
        {props.isRequired ? <span className="star">*</span> : null}
      </label>
      <select onChange={props.onInputChange} name={props.inputName} className="input-element select-input" id={props.inputName} required={props.isRequired}>
        <option value="" selected disabled>{props.defaultValue}</option>
        {options}
      </select>
    </FormControl>
  );
};

export default select;