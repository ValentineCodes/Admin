import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  BackHandler,
  TextInput,
  Keyboard,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';

import {Colors} from '../constants/colors';
import {styles} from '../styles/profile';

export default ({onRender, visible}) => {
  const [user, setUser] = useState('');

  const opacity = useSharedValue(0);

  const profileStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      display: opacity.value > 0 ? 'flex' : 'none',
    };
  });

  const getProfile = uID => {
    firestore()
      .collection('users')
      .doc(uID)
      .get()
      .then(user => {
        setUser(user.data());
      })
      .catch(err => console.log(err));
  };

  const showProfile = uID => {
    opacity.value = withTiming(1, {
      duration: 500,
    });

    visible(true);

    getProfile(uID);
  };

  const hideProfile = () => {
    opacity.value = withTiming(0, {
      duration: 200,
    });

    visible(false);
  };

  const renderLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
          Getting User Profile...
        </Text>
        <ActivityIndicator color="blue" size={30} style={{marginTop: 20}} />
      </View>
    );
  };

  useEffect(() => {
    onRender(showProfile, hideProfile);
  }, []);
  return (
    <Animated.View style={[styles.container, profileStyle]}>
      {user == '' ? (
        <>{renderLoader()}</>
      ) : (
        <>
          <View style={styles.image}>
            <Image
              source={
                user.img
                  ? {uri: user.img}
                  : require('../images/default_profile_pic.png')
              }
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.address}>{user.address}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.number}>{user.number}</Text>
          <Text style={styles.nin}>{user.nin}</Text>
        </>
      )}
    </Animated.View>
  );
};
