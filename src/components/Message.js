import React from 'react'

//Converted into functional component as it doesnt have state/lifecycle method
function Message(props){
    if(props.username === 'noUsername'){
        return console.log(props.username)
    }
    
    return (
        <div>
            <div key={props.key} className="message">
                <div className="message-username">{props.username}</div>
                <div className="message-text">{props.text}</div>
            </div>
        </div>
    )
    
}

export default Message