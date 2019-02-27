import React, { Component } from "react";
import * as MyScript from "myscript/dist/myscript.esm";
import "myscript/dist/myscript.min.css";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {

    //position: "relative"
    // position: "absolute",
    // bottom: "0",
    //height: "100%"
  },
  handwritingInput: {
    [theme.breakpoints.down('lg')]: {
      height: "300px"
    },
    [theme.breakpoints.up('lg')]: {
      height: "100vh"

    },
    borderTop: "5px solid blue",
    width: "100%",
    backgroundColor: "lightgray"

  },
  textInputBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",

  },
  textInput: {
    padding: "12px 20px",
    fontSize: "20px",
    width: "100%"
  },
  sendButton: {
    backgroundColor: "white",
    border: "1px solid lightgray"
  },
  editButton: {
    border: "1px solid black",
    padding: "5px",
    margin: "2px",
    float: "right"
  }

})

class TextInput extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    text: "",
    handwritingHidden: false
  };

  setText = update => {
    this.setState(!update ? { text: "" } : { text: update });
  };

  clearText = () => {
    this.setText("");
    document.getElementById("clear").click();
  };

  onChange = e => {
    this.setState({ text: e.target.value });
  };

  toggleHandWriting = () => {
    this.setState(prevState => ({
      handwritingHidden: !prevState.handwritingHidden
    }));
  };

  componentDidMount() {
    let editorElement = document.getElementById("editor");
    let undoElement = document.getElementById("undo");
    let redoElement = document.getElementById("redo");
    let clearElement = document.getElementById("clear");

    const exportCallback = props => evt => {
      var exports = evt.detail.exports;

      let changedText;

      exports ? (changedText = exports["text/plain"]) : (changedText = "");

      this.setState({ text: changedText });
    };

    editorElement.addEventListener("exported", exportCallback(this.props));

    this.editor = MyScript.register(editorElement, {
      recognitionParams: {
        type: "TEXT",
        protocol: "WEBSOCKET",
        apiVersion: "V4",
        server: {
          scheme: "https",
          host: "webdemoapi.myscript.com",
          applicationKey: "93cc2f86-b40e-4cc8-a00c-20f607a0c0a1",
          hmacKey: "f77e8688-f9e6-4bb6-8bff-9aeb2b951199"
        },
        v4: {
          text: {
            mimeTypes: ["text/plain"]
          }
        }
      }
    });

    undoElement.addEventListener("click", function () {
      editorElement.editor.undo();
    });

    redoElement.addEventListener("click", function () {
      editorElement.editor.redo();
    });

    clearElement.addEventListener("click", function () {
      editorElement.editor.clear();
    });

    window.addEventListener("resize", () => {
      this.editor.resize();
    });
  }

  render() {

    const { classes } = this.props

    return (
      <div className={classes.root}>
        {/* this is the div for the text input and send and min buttons */}
        <div
          className={classes.textInputBar}
        >
          <input
            type="text"
            className={classes.textInput}
            // style={styles.textInput}
            value={this.state.text}
            onChange={this.onChange}
          />
          <button
            className={classes.sendButton}
            //style={styles.sendButton}
            onClick={() => {
              this.props.send(this.state.text);
              this.clearText();
            }}
          >
            Send
          </button>
          <button className={classes.sendButton}
            //style={styles.sendButton}
            onClick={this.toggleHandWriting}>
            {this.state.handwritingHidden ? "Max" : "Min"}
          </button>
        </div>

        <div
          hidden={this.state.handwritingHidden}
          className={classes.handwritingInput}
          // style={{ ...styles.handwritingInput, height: lg ? "100vh" : "300px" }}
          //style={{ ...styles.handwritingInput }}
          id="editor"
        >
          <button
            className={classes.editButton}
            //style={styles.editButton}
            id="clear">
            clear
          </button>
          <button className={classes.editButton}
            //style={styles.editButton}
            id="undo">
            undo
          </button>
          <button className={classes.editButton}
            //style={styles.editButton}
            id="redo">
            redo
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TextInput)