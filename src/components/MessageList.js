import React from 'react'
import Message from './Message'
import RoomName from './RoomName'

/*MessageList is used for the outer structure of message window. Message.js is 
for each individual messages*/
class MessageList extends React.Component {
    render() {
        if(!this.props.roomId){
            return(
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            );
        }

        return (
            <div className="message-list">
                <div className="room-name">
                    <RoomName roomName={this.props.roomName} />
                </div>

                <div>
                    {this.props.message.map((message) => {
                        {if(!message.senderId)
                            return(
                                <Message username='noUsername' />
                            )
                        }
                        return(
                            <Message key={message.id} roomName={this.props.roomName} username={message.senderId} text={message.text} />
                        )
                    }
                    )}
                </div>                          
            </div>
        )
    }
}

export default MessageList