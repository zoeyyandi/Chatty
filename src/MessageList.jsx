import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {
    render() {
        const { messages, notification } = this.props
        return (
            <main className="messages">
                {messages.map((message, index) => <Message key={index} message={message} />)}
                <div className="message system">{notification}</div>
            </main> 
        )
    }
}

export default MessageList