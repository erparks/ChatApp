import React, { Component } from "react";
import Message from "../presenters/message";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: "1",
    overflow: "auto"
  }
};

class MessageList extends Component {
  render() {
    return (
      <div style={styles.root}>
        {this.props.messages.map((msg, i) => {
          let style;

          if (msg.username === this.props.username) {
            style = { float: "right", backgroundColor: "Blue" };
          } else {
            style = { float: "left", backgroundColor: "Gray" };
          }

          return (
            <div key={i}>
              <Grid container direction="row" justify={style.float === "right" ? "flex-end" : "flex-start"}>
                {/* {style.float === "right" && <Grid item md={6} />} */}
                <Grid item sm={12} md={6}>
                  <Message
                    style={style}
                    text={msg.text}
                    author={msg.username}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return state.currentRoom
    ? { messages: [...state.rooms[state.currentRoom]] }
    : { messages: [] };
};

export default connect(mapStateToProps)(MessageList);
