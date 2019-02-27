import React, { Component } from "react";

export default class AddRoom extends Component {
  state = {
    roomName: "123"
  };

  nameChange = e => {
    this.setState({ roomName: e.target.value });
  };

  onSubmit = (addRoom, setRoom, history) => {
    addRoom(this.state.roomName);
    history.push("/room/" + this.state.roomName);
    setRoom(this.state.roomName);
  };

  render() {

    const { addRoom, setRoom, history } = this.props;

    return (
      <div>
        room name:
        <input
          type="text"
          value={this.state.roomName}
          onChange={this.nameChange}
        />
        <button onClick={() => this.onSubmit(addRoom, setRoom, history)}>
          Add Room
        </button>
      </div>
    );
  }
}
