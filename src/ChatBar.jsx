import React, {Component} from 'react'

class ChatBar extends Component {
    constructor(props) {
        super(props);
    }

    handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            let username = this.user.value
            let content = event.target.value
            this.props.sendMessage(username, content) 
            //clearing out input field//
            event.target.value = ''
        }
    }
    handleKeyDown2 = (event) => {
        if(event.keyCode === 13) {
            let username = event.target.value
            this.props.changeName(username)
            event.target.blur()
            this.message.focus()
        }
    }

    render() {
        const { currentUser } = this.props
        return (
            <footer className="chatbar">
                <input
                    ref={user => this.user = user}
                    className="chatbar-username" 
                    placeholder="Your Name (Optional)" 
                    defaultValue={currentUser.name} 
                    onKeyDown={this.handleKeyDown2}
                />
                <input 
                    ref={message => this.message=message}
                    className="chatbar-message" 
                    placeholder="Type a message and hit ENTER" 
                    onKeyDown={this.handleKeyDown} />
            </footer>
        )
    }
}

export default ChatBar

