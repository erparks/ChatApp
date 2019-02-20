export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_CUR_ROOM = "SET_CUR_ROOM";

export function addMessage(message) {
  console.log("Message got");
  return {
    type: ADD_MESSAGE,
    username: message.username,
    room: message.room,
    text: message.text
  };
}

export function setCurRoom(name) {
  return {
    type: SET_CUR_ROOM,
    name: name
  };
}
