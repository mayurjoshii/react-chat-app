import React from 'react'
import Message from './Message'

/*MessageList is used for the outer structure of message window. Message.js is 
for each individual messages*/
class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.message.map((message) => {
                    return(
                        <Message key={message.id} username={message.senderId} text={message.text} />
                    )
                }
                )}
            </div>
        )
    }
}

export default MessageList