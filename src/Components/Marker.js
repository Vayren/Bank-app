import React from 'react';
import './Marker.css';

function Marker({color, name}){
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;