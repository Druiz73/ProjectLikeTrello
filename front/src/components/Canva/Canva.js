import React from 'react';
import './Canva.css'
const Canva = ({ children, isDaily, background }) => {
  return (
    <div id="canva" className={isDaily ? "canva" : background==="cork" ? "canva cork": background==="dark" ? "canva dark":background==="wood" ? "canva wood":"canva cork"}>
        {children}
    </div>
  );
}

export default Canva;