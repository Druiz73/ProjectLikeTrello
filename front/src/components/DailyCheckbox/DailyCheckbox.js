import React from 'react';
const DailyCheckbox = ({ user, handleOnChange, checked }) => {
  const { userId, email } = user;
  return (
    <div className="custom-control custom-checkbox">
      <input 
        type="checkbox" 
        className="custom-control-input" 
        name={userId} 
        id={userId}
        checked={checked}
        onChange={handleOnChange} 
      />
      <label className="custom-control-label" htmlFor={userId}>{email}</label>
    </div>
  );
}
 
export default DailyCheckbox;