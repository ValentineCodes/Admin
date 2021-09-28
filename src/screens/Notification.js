import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

import {styles} from '../styles/notification';

export default ({route, navigation}) => {
  const {id, name} = route.params;

  const [msg, setMsg] = useState('');

  const [isSending, setIsSending] = useState(false);

  const displayMsg = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const send = () => {
    setIsSending(true);
    // Send to a specific user
    firestore()
      .collection('notifications')
      .doc(id)
      .collection('messages')
      .add({
        msg,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then(snapshot => {
        displayMsg('Notification Sent');
        navigation.goBack();
      })
      .catch(err => console.log(err))
      .finally(() => setIsSending(false));
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack();

    return true;
  });

  useEffect(() => {
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.headerLeft}>
          <Icon name="arrow-back-outline" type="ionicon" size={30} />
          <Text allowFontScaling={false} style={styles.headerText}>
            Notify {name}
          </Text>
        </TouchableOpacity>

        {/* Send Button */}
        {isSending ? (
          <ActivityIndicator color="#5c5" size={27} />
        ) : (
          <Icon
            name="paper-plane-outline"
            type="ionicon"
            size={27}
            color={msg.trim() ? '#5c5' : '#ccc'}
            onPress={msg.trim() ? send : Keyboard.dismiss}
          />
        )}
      </View>

      <TextInput
        multiline
        autoFocus
        placeholder="Your message"
        placeholderTextColor="#888"
        value={msg}
        onChangeText={setMsg}
        returnKeyType="go"
        onSubmitEditing={msg.trim() ? send : Keyboard.dismiss}
        style={styles.inputField}
      />
    </View>
  );
};
