import React from 'react'

class SendMessageForm extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTyping = this.handleTyping.bind(this);

        this.state = {
            message: ''
        }
    }

    handleChange(e){
        this.setState({
            message: e.target.value
        });
    }

    handleTyping(){
        this.props.userTyping();
    }

    handleSubmit(e){
        e.preventDefault();

        //Send the message to the chatkit API and display it in the room
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit} 
                className="send-message-form">
                <input
                    onChange={(e) => { this.handleChange(e); this.handleTyping()}}
                    value={this.state.message}
                    placeholder="Type your message here..."
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm