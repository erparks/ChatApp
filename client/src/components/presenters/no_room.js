import React, { Component } from "react";

class NoRoom extends Component {
  render() {
    return !this.props.usernameSet ? (
      <div>
        Please enter a username
        <input
          type="text"
          value={this.props.username}
          onChange={this.props.usernameChange}
        />
        <button onClick={() => this.props.usernameSubmit(this.props.username)}>
          Start Chatting
        </button>
      </div>
    ) : (
      <h4>Please select or create a room on the side bar.</h4>
    );
  }
}
export default NoRoom;
