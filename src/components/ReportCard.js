import React, {useState, useEffect} from 'react';
import {View, Text, TouchableNativeFeedback, ToastAndroid} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {formatDistance} from 'date-fns';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import firestore from '@react-native-firebase/firestore';

// import {Colors} from '../constants/colors';
import {styles} from '../styles/reportCard';

export default function ReportCard({
  id,
  uID,
  name,
  address,
  lat,
  long,
  timeInSec,
  showUserLocation,
  navigation,
}) {
  const dispatch = useDispatch();

  const [isUserBlocked, setisUserBlocked] = useState(false);
  const [username, setUsername] = useState(name);

  const date = new Date(timeInSec * 1000);

  const timestamp = formatDistance(date, new Date(), {addSuffix: true});

  const displayMsg = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const sendNotification = () => {
    navigation.navigate('Notification', {
      id: uID,
      name,
    });
  };

  const toggleBlocked = () => {
    displayMsg(`You ${isUserBlocked ? 'unblocked' : 'blocked'} ${name}`);

    firestore()
      .collection('users')
      .doc(uID)
      .update({
        blocked: !isUserBlocked,
      })
      .catch(err => {
        return;
      });
  };

  const blockUser = () => {
    displayMsg(`You blocked ${name}`);

    firestore()
      .collection('users')
      .doc(uID)
      .update({
        blocked: true,
      })
      .catch(err => {
        return;
      });
  };

  const unblockedUser = () => {
    displayMsg(`You unblocked ${name}`);
    firestore()
      .collection('users')
      .doc(uID)
      .update({
        blocked: false,
      })
      .catch(err => {
        return;
      });
  };

  const removeReportFromRedux = () => {
    dispatch({
      type: 'removeReport',
      payload: id,
    });
  };

  const handled = () => {
    removeReportFromRedux();

    firestore()
      .collection('reports')
      .doc(id)
      .update({
        handled: true,
      })
      .catch(err => {
        return;
      });
  };

  const deleteReport = () => {
    removeReportFromRedux();

    firestore()
      .collection('reports')
      .doc(id)
      .delete()
      .catch(err => {
        return;
      });
  };

  const showLocation = () => {
    showUserLocation({lat, long});
  };

  const viewProfile = () => {
    navigation.navigate('Profile', {
      id: uID,
    });
  };

  // const markAsSeen = () => {
  //   dispatch({
  //     type: 'markAsSeen',
  //     payload: id,
  //   });
  // };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(uID)
      .onSnapshot(snapshot => {
        let _username = snapshot.data().name;
        let blocked = snapshot.data().blocked;

        setUsername(_username);

        setisUserBlocked(blocked);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        {/* Full Name and Address */}

        <View style={styles.userInfo}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>

        {/* </View> */}

        {/* Menu */}
        <Menu>
          <MenuTrigger>
            <Icon
              name="ellipsis-vertical-outline"
              type="ionicon"
              color="white"
            />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <MenuOption onSelect={showLocation}>
              <Text style={styles.menuOption}>Show location</Text>
            </MenuOption>
            <MenuOption onSelect={viewProfile}>
              <Text style={styles.menuOption}>View profile</Text>
            </MenuOption>
            <MenuOption onSelect={sendNotification}>
              <Text style={styles.menuOption}>Send notification</Text>
            </MenuOption>
            <MenuOption onSelect={handled}>
              <Text style={styles.menuOption}>Handled</Text>
            </MenuOption>
            <MenuOption onSelect={toggleBlocked}>
              <Text style={styles.menuOption}>
                {isUserBlocked ? 'Unblock' : 'Block'}
              </Text>
            </MenuOption>
            <MenuOption onSelect={deleteReport}>
              <Text style={{...styles.menuOption, color: 'red'}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </TouchableNativeFeedback>
  );
}
