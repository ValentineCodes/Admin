import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-elements';
import ImageModal from 'react-native-image-modal';

import {styles} from '../styles/profile';

export default ({route, navigation}) => {
  const [user, setUser] = useState('');
  const [isUserBlocked, setIsUserBlocked] = useState(user.blocked);

  const isImageModalOpen = useRef(false);

  const {id} = route.params;

  const displayMsg = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const getProfile = () => {
    firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(user => {
        setUser(user.data());
      })
      .catch(err => console.log(err));
  };

  const toggleBlocked = () => {
    setIsUserBlocked(current => !current);
    displayMsg(`You ${isUserBlocked ? 'unblocked' : 'blocked'} ${user.name}`);

    firestore()
      .collection('users')
      .doc(id)
      .update({
        blocked: !isUserBlocked,
      })
      .catch(err => {
        return;
      });
  };

  const sendNotification = () => {
    navigation.navigate('Notification', {
      id,
      name: user.name,
    });
  };

  const handleImageModalDidOpen = () => {
    isImageModalOpen.current = true;
  };

  const handleImageModalWillClose = () => {
    isImageModalOpen.current = false;
  };

  const call = () => {
    Linking.openURL(`tel:${user.number}`);
  };

  const exit = () => {
    navigation.pop();
  };

  const renderLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="blue" size={50} />
      </View>
    );
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (!isImageModalOpen.current) {
      navigation.goBack();
    }

    return true;
  });

  useEffect(() => {
    getProfile();

    return () => {
      backHandler.remove();
    };
  }, []);

  let blockedColor = isUserBlocked ? 'rgba(255,0,0,0.8)' : 'white';
  let img = user.img
    ? {uri: user.img}
    : require('../images/default_profile_pic.png');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerEnd} onPress={exit}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            size={30}
            color="white"
          />
          <Text allowFontScaling={false} style={styles.headerText}>
            Profile
          </Text>
        </TouchableOpacity>

        <View style={styles.headerEnd}>
          <Icon
            name="ban"
            type="font-awesome"
            size={27}
            color={blockedColor}
            onPress={toggleBlocked}
            iconStyle={{marginRight: 25}}
          />

          <Icon
            name="notifications-outline"
            type="ionicon"
            color="white"
            size={27}
            onPress={sendNotification}
          />
        </View>
      </View>
      {user == '' ? (
        <>{renderLoader()}</>
      ) : (
        <View style={{flex: 1}}>
          {/* <View style={styles.image}> */}
          {/* <Image
              source={img}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            /> */}

          <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={styles.image}
            source={img}
            didOpen={handleImageModalDidOpen}
            willClose={handleImageModalWillClose}
          />
          {/* </View> */}

          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            {/* Name */}
            <View style={styles.dataContainer}>
              <Icon
                name="person-outline"
                type="ionicon"
                color="white"
                size={17}
              />

              <View style={styles.profileData}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.data}>{user.name}</Text>
              </View>
            </View>

            {/* Home Address */}
            <View style={styles.dataContainer}>
              <Icon
                name="location-outline"
                type="ionicon"
                color="white"
                size={17}
              />

              <View style={styles.profileData}>
                <Text style={styles.label}>Home Address</Text>
                <Text style={styles.data}>{user.address}</Text>
              </View>
            </View>

            {/* Email */}
            <View style={styles.dataContainer}>
              <Icon
                name="mail-outline"
                type="ionicon"
                color="white"
                size={17}
              />

              <View style={styles.profileData}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.data}>{user.email}</Text>
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.dataContainer}>
              <Icon
                name="call-outline"
                type="ionicon"
                color="white"
                size={17}
                onPress={call}
              />

              <View style={styles.profileData}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.data}>{user.number}</Text>
              </View>
            </View>

            {/* National Identity Number */}
            <View style={styles.dataContainer}>
              <Icon
                name="person-outline"
                type="ionicon"
                color="white"
                size={17}
              />

              <View style={styles.profileData}>
                <Text style={styles.label}>National Identity Number</Text>
                <Text style={styles.data}>{user.nin}</Text>
              </View>
            </View>

            {/* Reports */}
            <View style={styles.dataContainer}>
              <Icon
                name="alert-circle-outline"
                type="ionicon"
                color="white"
                size={17}
              />

              <View style={styles.profileData}>
                <Text style={styles.label}>Reports</Text>
                <Text style={styles.data}>{user.reports}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
