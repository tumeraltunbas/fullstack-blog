import React from 'react';

function Button(props) {
  return (

    <button 
    type={props.type} 
    style={props.style} 
    className={props.className}
    onClick={props.onClick} 
    >
        {props.text}
    </button>
  )
}

export default Button;