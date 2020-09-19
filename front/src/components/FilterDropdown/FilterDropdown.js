import React from 'react';
import Select from 'react-select';
import './FilterDropdown.css'


const FilterDropdown = ({ options, handleOnChange }) => {
  return (
    <Select 
      defaultValue={{ label: options[0], value: options[0].toLowerCase()}}
      placeholder="Filtre sus notas..."
      options={options.map(option => ({ label: option, value: option.toLowerCase() }))}
      onChange={handleOnChange}
      getOptionValue={options => options.value}
      getOptionLabel={options => options.label}
      className="list"
    />
  );
}
 
export default FilterDropdown;