import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      allMessages: [],
      activeRoom: null
    };
  };

  componentDidMount() {
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      const allMessages = this.state.allMessages.concat( message );
      this.setState({
        allMessages: allMessages
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const messagesToUpdate = this.state.allMessages.filter(message => message.roomId.toString() === nextProps.activeRoom.key);
    this.setState({
      messages: messagesToUpdate,
      activeRoom: nextProps.activeRoom
    });
    // console.log(this.state.messages)
  }

  render() {
    return(
      <div className='message-list'>
        <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : 'Please Select a Room' }</h2>
        <ul>
          { this.state.messages.map( (message, index) =>
            <li key={index}>{ message.content }</li>
          )}
        </ul>
      </div>
    );
  }
}

export default MessageList;
