import React, { Component } from 'react';
import NewRoom from './NewRoom';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      modalOpen: false
    };


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

  toggleModal = () => {
     this.setState({
       modalOpen: !this.state.modalOpen
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

          <button onClick={this.toggleModal}>
             Add New Room
           </button>

           <NewRoom show={this.state.modalOpen}
              roomsRef={this.roomsRef}
             onClose={this.toggleModal} />
        </div>
      </div>
    );
  }
}

export default RoomList;
