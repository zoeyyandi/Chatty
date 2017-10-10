import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import data from './data.js';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = data
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          const messages = this.state.messages.concat(data)
          this.setState({messages})
          break;
        case "incomingNotification":
          this.setState({notification: data.content})
          break;
        case "activeUsers":
          this.setState({activeUsers: data.content});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  changeName = (user) => {
    if(this.state.currentUser.name !== user) {
      const postNotification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${user}`
      }
      this.socket.send(JSON.stringify(postNotification))
    }
  }

  sendMessage = (username, content) => {
    const message = {
      username,
      content,
      type: 'postMessage'
    }
    this.socket.send(JSON.stringify(message))
    // const messages = this.state.messages.concat(message)
    // this.setState({messages})
  }

  render() {
    return (
      <div>
        <NavBar activeUsers={this.state.activeUsers} />
        <MessageList notification={this.state.notification} messages={this.state.messages} />
        <ChatBar changeName={this.changeName} sendMessage={this.sendMessage} currentUser={this.state.currentUser} />
      </div>
    )
  }
}



