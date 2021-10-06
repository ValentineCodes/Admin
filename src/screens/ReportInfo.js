import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import VideoPlayer from 'react-native-video-controls';

import {styles} from '../styles/reportInfo';

export default ({navigation, route}) => {
  let {id} = route.params;

  const [moreInfo, setMoreInfo] = useState({
    description: '',
    video: {
      uri: '',
      duration: '',
    },
  });

  const goBack = () => {
    navigation.pop();
  };

  let backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    goBack();
    return true;
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('reports')
      .doc(id)
      .onSnapshot(snapshot => {
        let info = snapshot.data().moreInfo;
        setMoreInfo(info);
      });

    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          size={25}
          onPress={goBack}
        />
        <Text style={styles.headerTitle}>Reports</Text>
      </View>
      {/* Video */}
      <View style={styles.videoContainer}>
        {moreInfo.video.uri ? (
          <VideoPlayer
            source={{uri: moreInfo.video.uri}}
            style={styles.video}
            onBack={goBack}
          />
        ) : (
          <Icon name="videocam-sharp" type="ionicon" color="white" size={50} />
        )}
      </View>

      {/* Description */}
      <Text style={styles.description}>{moreInfo.description}</Text>
    </View>
  );
};
