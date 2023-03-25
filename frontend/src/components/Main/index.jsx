import React from 'react';
import "./Main.modules.css";

function Main(props) {
  return (
    <main>
        {props.children}
    </main>
  )
}

export default Main