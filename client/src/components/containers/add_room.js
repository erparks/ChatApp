import React, { Component } from "react";

export default class AddRoom extends Component {
  state = {
    roomName: ""
  };

  nameChange = e => {
    this.setState({ roomName: e.target.value });
  };

  onSubmit = (addRoom, history) => {
    addRoom(this.state.roomName);
    history.push("/room/" + this.state.roomName);
  };

  render() {
    console.log("history: " + this.props.history);
    return (
      <div>
        room name:
        <input
          type="text"
          value={this.state.roomName}
          onChange={this.nameChange}
        />
        <button
          onClick={() => this.onSubmit(this.props.addRoom, this.props.history)}
        >
          Add Room
        </button>
      </div>
    );
  }
}
