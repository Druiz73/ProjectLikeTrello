import React, { useState } from 'react';
import './SwitchBtn.css';

const SwitchBtn = ({ checked, setChecked }) => {
  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <div className="switch-container">
      <label className="d-flex">
        <span className="mr-2">Make public link</span>
        <input checked={checked} onChange={handleChange} className="switch" type="checkbox" />
        <div>
          <div></div>
        </div>
      </label>
    </div>
  );
}
 
export default SwitchBtn;