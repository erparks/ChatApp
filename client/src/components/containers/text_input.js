import React, { Component } from "react";
import * as MyScript from "myscript/dist/myscript.esm";
import "myscript/dist/myscript.min.css";

const styles = {
  handwritingInput: {
    height: "300px",
    borderTop: "5px solid blue",
    width: "100%",
    backgroundColor: "lightgray"
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
};

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  state = {
    text: "",
    handwritingHidden: false
  };

  setText = update => {
    this.setState(!update ? { text: "" } : { text: update });
  };

  send = (connection, username, room) => {
    this.state.text &&
      connection.send(
        JSON.stringify({
          type: "message",
          username: username,
          room: room,
          text: this.state.text
        })
      );

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

    undoElement.addEventListener("click", function() {
      editorElement.editor.undo();
    });

    redoElement.addEventListener("click", function() {
      editorElement.editor.redo();
    });

    clearElement.addEventListener("click", function() {
      editorElement.editor.clear();
    });

    window.addEventListener("resize", () => {
      this.editor.resize();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Rerender?");
    return this.state.text !== nextState.text;
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "center"
          }}
        >
          <input
            type="text"
            style={styles.textInput}
            value={this.state.text}
            onChange={this.onChange}
          />
          <button
            style={styles.sendButton}
            onClick={() =>
              this.send(this.props.connection, this.props.username)
            }
          >
            Send
          </button>
          <button style={styles.sendButton} onClick={this.toggleHandWriting}>
            {this.state.handwritingHidden ? "Max" : "Min"}
          </button>
        </div>

        <div
          hidden={this.state.handwritingHidden}
          style={styles.handwritingInput}
          id="editor"
        >
          <button style={styles.editButton} id="clear">
            clear
          </button>
          <button style={styles.editButton} id="undo">
            undo
          </button>
          <button style={styles.editButton} id="redo">
            redo
          </button>
        </div>
      </div>
    );
  }
}
