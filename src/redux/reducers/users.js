export default function usersReducer(state = [], action) {
  if (action.type == 'addUsers') {
    return action.payload;
  } else {
    return state;
  }
}
