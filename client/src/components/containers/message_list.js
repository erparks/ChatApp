import React, { Component } from "react";
import Message from "../presenters/message";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: "1",
    overflowX: "auto",

    [theme.breakpoints.down("lg")]: {
      height: `calc(100% - 358px)`
    },
    [theme.breakpoints.up("lg")]: {
      height: "100vh"
    }
  }
});

class MessageList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div id="message_list" className={classes.root}>
        {this.props.messages.map((msg, i) => {
          let style;

          if (msg.username === this.props.username) {
            style = { float: "right", backgroundColor: "Blue" };
          } else {
            style = { float: "left", backgroundColor: "Gray" };
          }

          return (
            <Grid
              key={i}
              container
              direction="row"
              justify={style.float === "right" ? "flex-end" : "flex-start"}
            >
              {/* {style.float === "right" && <Grid item md={6} />} */}
              <Grid item sm={12} md={6}>
                <Message style={style} text={msg.text} author={msg.username} />
              </Grid>
            </Grid>
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

export default connect(mapStateToProps)(withStyles(styles)(MessageList));
