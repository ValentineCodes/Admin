import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import Home from './src/screens/Home';

const App = () => {
  const currentReports = useSelector(state => state.reports);
  const dispatch = useDispatch();

  const sendNotification = msg => {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'reportId', // (required) channelId, if the channel doesn't exist, notification will not trigger.

      title: 'Emergency Report!!!', // (optional)
      message: msg,
      number: 1, // (required)
    });
  };

  useEffect(() => {
    changeNavigationBarColor('transparent', true);

    // Listen for new updates
    const subscriber = firestore()
      .collection('reports')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        // Get reports from 'snapshot' and filter out handled ones
        const reports = snapshot.docs
          .map(report => {
            const id = report.ref._documentPath._parts[1];
            return {id, ...report.data()};
          })
          .filter(report => report.handled === false);

        // sendNotification('New reports have arrived');

        // Store reports in redux
        dispatch({
          type: 'addReports',
          payload: reports,
        });
      });
  }, []);

  return (
    <NavigationContainer>
      <View style={{flex: 1, backgroundColor: 'rgba(0,8,51, 0.9)'}}>
        <StatusBar backgroundColor="rgba(0,8,51,0.8)" />
        <Home />
      </View>
    </NavigationContainer>
  );
};

export default App;
