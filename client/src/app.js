import React, { Component } from "react";
import Conversation from "./components/containers/conversation";
import RoomDrawer from "./components/presenters/room_drawer";
import MessageList from "./components/containers/message_list";
import TextInput from "./components/containers/text_input";
import { BrowserRouter as Router, Route } from "react-router-dom";

const NoRoom = () => <h4>Please select or create a room on the side bar.</h4>;

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

class App extends Component {
  state = {
    connection: null,
    currentRoom: null,
    username: "",
    usernameSet: false,
    messages: [],
    rooms: []
  };

  componentDidMount() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    let connection = new WebSocket("ws://127.0.0.1:8080");
    this.setState({ connection: connection });

    connection.onmessage = this.onMessage;
  }

  addRoom = connection => name => {
    this.state.connection &&
      connection.send(
        JSON.stringify({
          type: "subscribe",
          room: name
        })
      );

    this.setState(prevState => ({
      rooms: [...prevState.rooms, name]
    }));
  };

  setRoom = name => {
    this.setState({ currentRoom: name });
  };

  getMessagesByRoom = room => {
    return this.state.messages.find(msg => msg.room === room);
  };

  renderConversation() {
    console.log("refresh");
    return <h1>dsf</h1>;
  }

  render() {
    console.log("app refresh");
    return (
      <Router>
        <div style={{ display: "flex", direction: "row" }}>
          <RoomDrawer
            rooms={this.state.rooms}
            addRoom={this.addRoom(this.state.connection)}
          />
          <main style={{ flexGrow: "1" }}>
            <div>
              <Route exact path="/" component={NoRoom} />
              <Route
                path="/:id"
                component={() => (
                  <Conversation
                    username={this.state.username}
                    usernameSubmit={name => this.setState({ username: name })}
                    connection={this.state.connection}
                    currentRoom={this.currentRoom}
                  />
                )}
              />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
