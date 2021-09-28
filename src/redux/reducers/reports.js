import PushNotification from 'react-native-push-notification';

const sendNotification = msg => {
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: 'reportId', // (required) channelId, if the channel doesn't exist, notification will not trigger.

    title: 'Emergency Report!!!', // (optional)
    message: msg,
    number: 1, // (required)
  });
};

export default function reportsReducer(state = [], action) {
  if (action.type == 'addReports') {
    let existingIds = state.map(record => record.id);
    let payloadIds = action.payload.map(record => record.id);

    if (JSON.stringify(existingIds) !== JSON.stringify(payloadIds)) {
      sendNotification('You have a new report!!!');
    }

    return action.payload;
  } else if (action.type == 'removeReport') {
    return state.filter(record => record.id !== action.payload);
  } else if (action.type == 'markAsSeen') {
    return state.map(report =>
      report.id === action.payload
        ? {
            ...report,
            seen: true,
          }
        : report,
    );
  } else {
    return state;
  }
}
