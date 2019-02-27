import React, { Component } from "react";
import { connect } from "react-redux";
import Conversation from "./components/containers/conversation";
import RoomDrawer from "./components/presenters/room_drawer";
import AddRoom from "./components/containers/add_room";
import NoRoom from "./components/presenters/no_room";
import { addMessage, setCurRoom, addRoom } from "./actions";
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";

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
    username: "ethan",
    usernameSet: false
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
      return;
    }

    if (json.type === "message") {
      const { username, text, room } = json;

      dispatch(addMessage(json));
    }
  };

  newRoom = (connection, dispatch) => name => {
    dispatch(addRoom(name))

    this.state.connection &&
      connection.send(
        JSON.stringify({
          type: "subscribe",
          username: this.state.username,
          room: name
        })
      );
  };

  setRoom = (dispatch, history) => name => {

    dispatch(setCurRoom(name));
    history.push("/room/" + name);
  };

  getMessagesByRoom = room => {
    return this.state.messages.find(msg => msg.room === room);
  };

  usernameChange = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    console.log("app refresh");

    const { history, dispatch } = this.props;

    return (
      <div style={{ display: "flex", direction: "row" }}>
        <RoomDrawer
          addDisabled={!this.state.usernameSet}
          setRoom={this.setRoom(dispatch, history)}
          rooms={this.props.rooms}
          history={this.props.history}
        />
        <main style={{ flexGrow: "1" }}>

          <Route
            exact
            path="/"
            render={() => (
              <NoRoom
                usernameSet={this.state.usernameSet}
                username={this.state.username}
                usernameChange={this.usernameChange}
                usernameSubmit={name =>
                  this.setState({ username: name, usernameSet: true })
                }
              />
            )}
          />
          <Route
            path="/AddRoom"
            render={props => (
              <AddRoom
                {...props}
                setRoom={this.setRoom(dispatch, history)}
                addRoom={this.newRoom(this.state.connection, dispatch)}
              />
            )}
          />
          <Route
            path="/room/:id"
            render={() => {
              return <Conversation
                currentRoom={this.props.currentRoom}
                username={this.state.username}
                connection={this.state.connection}
              />
            }}
          />

        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentRoom: state.currentRoom, rooms: Object.keys(state.rooms) };
};

export default withRouter(connect(mapStateToProps)(App));
