export default function reportsReducer(state = [], action) {
  if (action.type == 'addReports') {
    return action.payload;
  } else {
    return state;
  }
}
