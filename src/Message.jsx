import React, {Component} from 'react'

class Message extends Component {
    render() {
        const { message, color } = this.props
        const UserColor = {
            color: message.color
        }
        const imageStyle = {
            display: 'block',
            maxWidth: '60%'
        }
        const imageRegex = /(http)?s?:?(\/\/[^"']*\.(?:jpg|gif|png))/

        const content = message.content.split(' ')
        let textBeforeImage = []
        let textAfterImage = []
        let image
        let isBefore = true
        
        content.forEach(function(element) {
            if(imageRegex.test(element)) {
                image = element
                isBefore = false
            } else {
                isBefore ? textBeforeImage.push(element) : textAfterImage.push(element)
            }
        })

        return (
            <div className="message">
                {message.username ? <span style={UserColor} className="message-username">{message.username}</span> : null}
                <span className="message-content">
                    {textBeforeImage.join(' ')}
                    {image ? <img style={imageStyle} src={image} alt="Unable to load image!" /> : null}
                    {textAfterImage.join(' ')}
                </span>
            </div>
        )
    }
}

export default Message