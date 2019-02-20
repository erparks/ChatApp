import React, { Component } from "react";
import { connect } from "react-redux";
import Conversation from "./components/containers/conversation";
import RoomDrawer from "./components/presenters/room_drawer";
import AddRoom from "./components/containers/add_room";
import { addMessage } from "./actions";
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
  constructor(props) {
    super(props);
  }
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

    connection.onmessage = this.onMessage(this.props.dispatch);
  }

  onMessage = dispatch => message => {
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log("Invalid JSON: ", message.data);
      return;
    }

    if (json.type === "message") {
      const { username, text, room } = json;

      console.log("dispatching: " + text);
      dispatch(addMessage(text));
    }
  };

  addRoom = connection => name => {
    this.state.connection &&
      connection.send(
        JSON.stringify({
          type: "subscribe",
          username: this.state.username,
          room: name
        })
      );

    this.setState(prevState => ({
      rooms: [...prevState.rooms, name],
      currentRoom: name
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
          <RoomDrawer rooms={this.state.rooms} />
          <main style={{ flexGrow: "1" }}>
            <div>
              <Route exact path="/" component={NoRoom} />
              <Route
                path="/AddRoom"
                render={props => (
                  <AddRoom
                    {...props}
                    addRoom={this.addRoom(this.state.connection)}
                  />
                )}
              />
              <Route
                path="/room/:id"
                component={() => (
                  <Conversation
                    username={this.state.username}
                    usernameSubmit={name => this.setState({ username: name })}
                    connection={this.state.connection}
                    currentRoom={this.state.currentRoom}
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

export default connect()(App);
