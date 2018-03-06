import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC8BXzQ04Y04MwYi5gc8M9YoGngNf0C3ZY",
  authDomain: "bloc-chat-4523c.firebaseapp.com",
  databaseURL: "https://bloc-chat-4523c.firebaseio.com",
  projectId: "bloc-chat-4523c",
  storageBucket: "bloc-chat-4523c.appspot.com",
  messagingSenderId: "877629697957"
};
firebase.initializeApp(config);

var sessionsRef = firebase.database().ref("sessions");
sessionsRef.push({
  sentAt: firebase.database.ServerValue.TIMESTAMP
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null
    };

    this.setRoom = this.setRoom.bind(this);
  };

  setRoom(room) {
    this.setState({ activeRoom: room })
  }

  render() {
    return (
      <div className="container">
        <RoomList firebase={ firebase } activeRoom={ this.state.activeRoom } setRoom={this.setRoom} />
        <MessageList firebase={ firebase } activeRoom={ this.state.activeRoom } />
      </div>
    );
  }
}

export default App;
