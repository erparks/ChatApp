export const ADD_MESSAGE = "ADD_MESSAGE";

export function addMessage(message) {
  console.log("Message got");
  return {
    type: ADD_MESSAGE,
    text: message
  };
}
