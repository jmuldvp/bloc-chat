import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newRoomName: ""
    };
    this.createRoom = this.createRoom.bind(this);
    this.updateRoomNameValue = this.updateRoomNameValue.bind(this);
  }

  createRoom() {
    this.props.roomsRef.push({name: this.state.newRoomName});
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
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: 'rgb(0,0,0)',
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 350,
      minHeight: 125,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>

          Create new room
          <input value={this.state.newRoomName} onChange={this.updateRoomNameValue}/>

          <button onClick={this.createRoom}>
            Create Room
          </button>

          <div className="footer">
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
