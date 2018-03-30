import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      this.setState({
        user
      })
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return(
      <div>
        <span>Logged in as: {currentUser} </span>
        <button onClick={ this.signIn.bind(this) }>
           Sign-in
        </button>
        <button onClick={ this.signOut.bind(this)}>
          Logout
        </button>
      </div>
    );
  }
}

export default User;
