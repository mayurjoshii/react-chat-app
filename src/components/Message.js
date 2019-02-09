import React from 'react'

//Converted into functional component as it doesnt have state/lifecycle method
function Message(props){  
    
    return (
        <div key={props.key} className="message">
            <div className="message-username">{props.username}</div>
            <div className="message-text">{props.text}</div>
        </div>
    )
    
}

export default Message