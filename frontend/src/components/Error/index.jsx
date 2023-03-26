import React, { useEffect, useState } from 'react'
import "./Error.modules.css";

function Error(props) {

    const [showError, setShowError] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setShowError(false);
        }, 3000)

    }, [showError])

  return (
    <div 
    className="error"
    style={props.style}
    >
        {showError && (
            <p>{props.text}</p>
        )}
    </div>

    )
}

export default Error;