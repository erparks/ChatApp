import { ADD_MESSAGE, SET_CUR_ROOM } from "../actions";

const initState = {};

export default function message(state = initState, action) {
  console.log("reducer");
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case ADD_MESSAGE:
      console.log("reducer - message");
      return Object.assign({}, state, {
        [action.room]: [
          ...state[action.room],
          { text: action.text, username: action.username }
        ]
      });
    case SET_CUR_ROOM:
      return Object.assign({}, state, {
        currentRoom: action.name,
        [action.name]: state.hasOwnProperty([action.name])
          ? [...state[action.room]]
          : []
      });

    default:
      return state;
  }
}
