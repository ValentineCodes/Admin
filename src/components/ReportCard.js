import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
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

import {Colors} from '../constants/colors';
import {styles} from '../styles/reportCard';

export default function ReportCard({
  id,
  uID,
  name,
  address,
  lat,
  long,
  timeInSec,
  onPress,
  showUserLocation,
}) {
  const dispatch = useDispatch();

  const [isUserBlocked, setisUserBlocked] = useState(false);
  const [username, setUsername] = useState(name);

  const date = new Date(timeInSec * 1000);

  const timestamp = formatDistance(date, new Date(), {addSuffix: true});

  const handled = () => {
    console.log(id);
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

  const blockUser = () => {
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

  const deleteReport = () => {
    firestore()
      .collection('reports')
      .doc(id)
      .delete()
      .catch(err => {
        return;
      });
  };

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
    <View style={styles.container}>
      {/* Full Name and Address */}
      <TouchableOpacity
        onPress={onPress.bind(this, uID)}
        style={styles.userInfo}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </TouchableOpacity>
      {/* </View> */}

      {/* Menu */}
      <Menu>
        <MenuTrigger>
          <Icon name="ellipsis-vertical-outline" type="ionicon" color="white" />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <MenuOption onSelect={() => showUserLocation({lat, long})}>
            <Text style={styles.menuOption}>Show location</Text>
          </MenuOption>
          <MenuOption>
            <Text style={styles.menuOption}>Send Notification</Text>
          </MenuOption>
          <MenuOption onSelect={handled}>
            <Text style={styles.menuOption}>Handled</Text>
          </MenuOption>
          <MenuOption onSelect={isUserBlocked ? unblockedUser : blockUser}>
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
  );
}
