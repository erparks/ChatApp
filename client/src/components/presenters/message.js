import React from "react";
const styles = {
  text: {
    borderRadius: "10px",
    color: "white",
    padding: "10px",
    margin: "0px"
  },
  author: {
    color: "gray",
    marginTop: "2px",
    clear: "both"
  }
};

export default function Message(props) {
  const { backgroundColor, float } = props.style;

  return (
    <div style={{ overflowX: "scroll" }}>
      <div
        style={{
          ...styles.text,
          backgroundColor,

          float
        }}
      >
        {props.text}
      </div>

      <p style={{ ...styles.author, float }}>{props.author}</p>
    </div>
  );
}
