import React from 'react';
import {View, StatusBar} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';

import Home from './src/screens/Home';

const App = () => {
  const dispatch = useDispatch();

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

      // Store reports in redux
      dispatch({
        type: 'addReports',
        payload: reports,
      });
    });

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="rgba(0,8,51,0.8)" />
      <Home />
    </View>
  );
};

export default App;
