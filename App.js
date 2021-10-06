import React, {useEffect} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import RNBootSplash from 'react-native-bootsplash';

// Screens
import Home from './src/screens/Home';
import Notification from './src/screens/Notification';
import Users from './src/screens/Users';
import Profile from './src/screens/Profile';
import ReportInfo from './src/screens/ReportInfo';

const Stack = createNativeStackNavigator();

const App = () => {
  let currentReports = useSelector(state => state.reports);
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
    RNBootSplash.hide({fade: true});
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

        // if (reports.length > currentReports.length) {
        //   sendNotification('You have a new report');
        // }

        // Store reports in redux
        dispatch({
          type: 'addReports',
          payload: reports,
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar backgroundColor="rgba(0,8,51,0.8)" barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Users"
            component={Users}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReportInfo"
            component={ReportInfo}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(0,8,51, 0.9)'},
});

export default App;
