import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {formatDistance} from 'date-fns';

import {Colors} from '../constants/colors';
import {styles} from '../styles/reportCard';

export default function ReportCard({reportData, showMyLocation}) {
  const dispatch = useDispatch();

  const date = new Date(reportData.timestamp.seconds * 1000);

  const timestamp = formatDistance(date, new Date(), {addSuffix: true});

  // Listen for user profile updates
  // const subscriber = firestore()
  //   .collection('users')
  //   .doc(reportData.uID)
  //   .onSnapshot(snapshot => console.log('User: ', snapshot));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Profile Pic */}
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={require('../images/image.jpg')}
            resizeMode="cover"
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* Full Name and Address */}
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>{reportData.name}</Text>
          <Text style={styles.address}>{reportData.address}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>

      {/* location */}
      <TouchableOpacity
        onPress={() => showMyLocation(reportData.coords[0])}
        style={styles.location}>
        <Icon
          name="location-outline"
          type="ionicon"
          size={27}
          color={Colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
}
