import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.createRoom = this.createRoom.bind(this);
    this.updateRoomNameValue = this.updateRoomNameValue.bind(this);
  }

  componentDidMount() {
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.roomsRef.on('child_added', snapshot => {
      // console.log(snapshot)
      const room = snapshot.val();
      room.key = snapshot.key;
      // console.log(room)
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom() {
    this.roomsRef.push({name: this.state.newRoomName});
    this.setState({
      newRoomName: ''
    });
  }

  updateRoomNameValue(evt) {
    this.setState({
      newRoomName: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.rooms.map( (room, index) =>
            <li key={index}>{ room.name }</li>
          )}
        </ul>
        <div>
          Add room name:
          <input value={this.state.newRoomName} onChange={this.updateRoomNameValue}/>
          <button type="button" onClick={this.createRoom}>Create</button>
        </div>
      </div>
    );
  }
}

export default RoomList;
