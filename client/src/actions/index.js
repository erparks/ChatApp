export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_CUR_ROOM = "SET_CUR_ROOM";
export const ADD_ROOM = "ADD_ROOM"

export function addRoom(name) {
  return {
    type: ADD_ROOM,
    name: name
  }
}

export function addMessage(message) {
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
