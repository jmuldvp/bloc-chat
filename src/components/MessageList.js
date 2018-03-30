import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      allMessages: [],
      activeRoom: null,
      newMessage: ""
    };
    this.createMessage = this.createMessage.bind(this);
    this.updateNewMessageValue = this.updateNewMessageValue.bind(this);
    this.messagesRef = this.props.firebase.database().ref('messages');
  };

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      const allMessages = this.state.allMessages.concat( message );
      this.setState({ allMessages: allMessages },() => {
        this.updateDisplayedMessages(this.props);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateDisplayedMessages(nextProps)
  }

  updateDisplayedMessages(props) {
    if(props.activeRoom) {
      const messagesToUpdate = this.state.allMessages.filter(message => message.roomId.toString() === props.activeRoom.key);
      this.setState({
        messages: messagesToUpdate,
        activeRoom: props.activeRoom
      });
    }
  }

  createMessage() {
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.state.activeRoom.key,
      username: this.props.user.email
    });

    this.setState({
      newMessage: ''
    });
  }

  updateNewMessageValue(evt) {
    this.setState({
      newMessage: evt.target.value
    });
  }

  render() {
    return(
      <div className='message-list'>
        <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : 'Please Select a Room' }</h2>
        <ul>
          { this.state.messages.map( (message, index) =>
            <li key={index}><b>{ message.username }:</b> <br />{ message.content }</li>
          )}
        </ul>
        <span className='message-footer'>

          { this.props.activeRoom ?
          <div>
            <input value={this.state.newMessage} onChange={this.updateNewMessageValue} />
            <button onClick={this.createMessage}>
              Send
            </button>
          </div>
           : null }

        </span>
      </div>
    );
  }
}

export default MessageList;
