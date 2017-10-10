import React, {Component} from 'react'

class Message extends Component {
    render() {
        const { message, color } = this.props
        const UserColor = {
            color: message.color
        }
        return (
            <div className="message">
                <span style={UserColor} className="message-username">{message.username}</span>
                <span className="message-content">{message.content}</span>
            </div>
        )
    }
}

export default Message