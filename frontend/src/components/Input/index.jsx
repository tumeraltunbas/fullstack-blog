import React from 'react'

function Input(props) {
  return (

    <input 
    type={props.type} 
    id={props.id} 
    name={props.name} 
    className={props.className}
    style={props.style}
    value={props.value}
    placeholder={props.placeholder} 
    onChange={props.onChange} 
    />

    )
}

export default Input