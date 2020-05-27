import React from 'react';

function CountrySelect(props) {
  return <option value={props.country}>{props.country} </option>;
}

export default CountrySelect;
