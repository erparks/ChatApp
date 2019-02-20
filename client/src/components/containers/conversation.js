import React, { Component } from "react";
import MessageList from "./message_list";
import TextInput from "./text_input";
import { withRouter } from "react-router-dom";

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  handInput: {
    height: "300px",
    borderTop: "5px solid red",
    width: "auto",
    backgroundColor: "lightgray"
  },
  textInput: {
    padding: "12px 20px",
    fontSize: "20px",
    margin: "20px 0px",
    width: "auto"
  },
  messages: {
    height: "100%"
  }
};

class Conversation extends Component {
  constructor(props) {
    super(props);

    if (!props.connection) {
      this.props.history.push("/");
    }
  }

  state = {
    username: "",
    messages: []
  };

  onMessage = message => {
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log("Invalid JSON: ", message.data);
      return;
    }

    if (json.type === "message") {
      // console.log(json.room);
      // console.log(json.username);
      // console.log(json.text);

      const { username, text, room } = json;

      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          { room: room, username: username, text: text }
        ]
      }));
    }
  };

  usernameChange = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return this.props.username !== "" ? (
      <div style={styles.root}>
        <MessageList
          key={1}
          currentRoom={this.props.currentRoom}
          username={this.props.username}
        />

        <TextInput
          key={2}
          username={this.props.username}
          currentRoom={this.props.currentRoom}
          connection={this.props.connection}
        />
      </div>
    ) : (
      <div>
        Please enter a username
        <input
          type="text"
          value={this.state.username}
          onChange={this.usernameChange}
        />
        <button onClick={() => this.props.usernameSubmit(this.state.username)}>
          Start Chatting
        </button>
      </div>
    );
  }
}

export default withRouter(Conversation);
