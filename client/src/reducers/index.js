import { ADD_MESSAGE } from "../actions";

const initState = { m: [] };

export default function message(state = initState, action) {
  console.log("reducer");
  // For now, don't handle any actions
  // and just return the state given to us.
  switch (action.type) {
    case ADD_MESSAGE:
      console.log("reducer - message");
      return Object.assign({}, state, {
        messages: [...state.messages, action.text]
      });
    default:
      return state;
  }
}
