import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  Linking,
  Image,
} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import ImageModal from 'react-native-image-modal';

import {styles} from '../styles/user';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default ({user, navigation}) => {
  const [isBlocked, setIsBlocked] = useState(user.blocked);

  const getDateJoined = () => {
    let date = new Date(user.joinedOn.seconds * 1000);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return `${MONTHS[monthIndex]} ${day}, ${year} @${hour}:${minutes}${
      hour >= 0 && hour < 12 ? 'am' : 'pm'
    }`;
  };

  const displayMsg = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const call = () => {
    Linking.openURL(`tel:${user.number}`);
  };

  const sendNotification = () => {
    navigation.navigate('Notification', {
      id: user.id,
      name: user.name,
    });
  };

  const toggleBlocked = () => {
    setIsBlocked(current => !current);
    displayMsg(`You ${isBlocked ? 'unblocked' : 'blocked'} ${user.name}`);

    firestore()
      .collection('users')
      .doc(user.id)
      .update({
        blocked: !isBlocked,
      })
      .catch(err => {
        return;
      });
  };

  let blockedColor = isBlocked ? 'rgba(255,0,0,0.8)' : 'rgba(0,0,255,0.1)';
  let blockedReverseColor = isBlocked
    ? 'rgba(255,255,255,0.6)'
    : 'rgba(0,0,200,0.5)';

  let img = user.img
    ? {uri: user.img}
    : require('../images/default_profile_pic.png');
  return (
    <>
      <View style={styles.accordionHeader}>
        <View style={styles.profilePicContainer}>
          {/* <Image source={img} style={styles.profilePic} /> */}
          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#ededed"
            modalImageStyle={{width: 1000, height: 1000}}
            style={styles.profilePicContainer}
            source={img}
          />
        </View>

        <View style={styles.headerContent}>
          <Text allowFontScaling={false} style={styles.title}>
            Name
          </Text>

          <Text allowFontScaling={false} style={styles.value}>
            {user.name}
          </Text>
        </View>
      </View>
      <View style={{marginLeft: 65}}>
        {/* Name */}

        {/* Address */}
        <View style={{...styles.content, marginTop: -10}}>
          <Text allowFontScaling={false} style={styles.title}>
            Address
          </Text>

          <Text allowFontScaling={false} style={styles.value}>
            {user.address}
          </Text>
        </View>

        {/* Email */}
        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.title}>
            Email
          </Text>

          <Text allowFontScaling={false} style={styles.value}>
            {user.email}
          </Text>
        </View>

        {/* NIN */}
        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.title}>
            NIN
          </Text>

          <Text allowFontScaling={false} style={styles.value}>
            {user.nin}
          </Text>
        </View>

        {/* Reports */}
        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.title}>
            Reports
          </Text>
          <Badge value={user.reports} status="error" />
        </View>

        {/* Joined */}

        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.title}>
            Joined
          </Text>

          <Text allowFontScaling={false} style={styles.value}>
            {getDateJoined()}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.title}>
            Actions
          </Text>

          <View style={styles.actions}>
            <Icon
              reverse
              name="call-outline"
              type="ionicon"
              size={15}
              color="rgba(0,0,255,0.1)"
              reverseColor="rgba(0,0,200,1)"
              onPress={call}
            />
            <Icon
              reverse
              name="notifications-outline"
              type="ionicon"
              size={18}
              color="rgba(0,0,255,0.1)"
              reverseColor="rgba(0,0,200,1)"
              onPress={sendNotification}
            />
            <Icon
              reverse
              name="ban"
              type="font-awesome"
              size={21}
              color={blockedColor}
              reverseColor={blockedReverseColor}
              onPress={toggleBlocked}
            />
          </View>
        </View>
      </View>
    </>
  );
};
