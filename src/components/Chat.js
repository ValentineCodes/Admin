import React, {useState, useEffect, useRef} from 'react';
import {
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

import {Colors} from '../constants/colors';
import {styles} from '../styles/chat';

export default function Chat({setViewReportData}) {
  return (
    <TouchableOpacity
      activeOpacity={0}
      onPress={() => setViewReportData(false)}
      style={styles.popUpContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.reportContainer}>
        <ImageBackground
          source={require('../images/chat_bg_img1.jpg')}
          style={{width: '100%', height: '100%'}}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
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
                <Text style={styles.name}>Valentine Orga</Text>
                <Text style={styles.address}>Big Chuck Hostel</Text>
              </View>
            </View>

            {/* location */}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.location}>
                <Icon
                  name="location-outline"
                  type="ionicon"
                  size={27}
                  color={Colors.secondary}
                />
              </TouchableOpacity>

              <Text style={styles.timestamp}>Just now</Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView style={{flex: 1}}></ScrollView>

          {/* TextInput Field */}
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                multiline
                autoFocus
                placeholder="Type a message"
                style={styles.inputField}
              />
              <Icon
                name="attach-outline"
                type="ionicon"
                size={27}
                color="grey"
                style={{transform: [{rotateZ: '-50deg'}]}}
              />
            </View>

            <TouchableOpacity activeOpacity={0.5} style={{marginRight: -5}}>
              <Icon
                reverse
                name="paper-plane-outline"
                type="ionicon"
                size={20}
                color="#0a0"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
