import React, { Component } from "react";
import MessageList from "./message_list";
import TextInput from "./text_input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const styles = {
  root: {
    height: "100vh",
  }
};

class Conversation extends Component {
  constructor(props) {
    super(props);

    if (!props.connection) {
      this.props.history.push("/");
    }
  }

  send = (connection, username, room) => text => {
    let json = JSON.stringify({
      type: "message",
      username: username,
      room: room,
      text: text
    });

    text && connection.send(json);
  };

  render() {
    return (
      <div style={styles.root}>
        <Grid container direction="row">
          <Grid item xs={12} lg={6} >

            <MessageList
              currentRoom={this.props.currentRoom}
              username={this.props.username}
            />

          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              username={this.props.username}
              send={this.send(
                this.props.connection,
                this.props.username,
                this.props.currentRoom
              )}
              currentRoom={this.props.currentRoom}
              connection={this.props.connection}
            /></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { currentRoom: state.currentRoom };
};

// export default connect(mapStateToProps)(withRouter(Conversation));

export default withRouter(Conversation);