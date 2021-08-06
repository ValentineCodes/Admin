export default function getDrawerStatusFromState(state) {
  var _entry$status;

  if (state.history == null) {
    throw new Error("Couldn't find the drawer status in the state object. Is it a valid state object of drawer navigator?");
  }

  const entry = state.history.find(it => it.type === 'drawer');
  return (_entry$status = entry === null || entry === void 0 ? void 0 : entry.status) !== null && _entry$status !== void 0 ? _entry$status : 'closed';
}
//# sourceMappingURL=getDrawerStatusFromState.js.map