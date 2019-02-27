import { ADD_MESSAGE, SET_CUR_ROOM, ADD_ROOM } from "../actions";


export default function message(state = {}, action) {

  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        rooms: {
          ...state.rooms,
          [action.room]: [
            ...state.rooms[action.room],
            { text: action.text, username: action.username }
          ]
        }
      })

    case SET_CUR_ROOM:

      return Object.assign({}, state, {
        currentRoom: action.name
      })

    case ADD_ROOM:
      return Object.assign({}, state, {
        rooms: { ...state.rooms, [action.name]: [] }
      })

    default:
      return state;
  }
}
