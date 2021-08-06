import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import {styles} from '../styles/home';
import {mapStyle} from '../styles/map';

import {Colors} from '../constants/colors';

import ReportCard from '../components/ReportCard';

export default function Reports() {
  const screenWidth = Dimensions.get('screen').width;
  const drawerPositon = useSharedValue(screenWidth);

  const animatedDrawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drawerPositon.value}],
    };
  });

  const showDrawer = () => {
    setIsDrawerOpen(true);
    drawerPositon.value = withTiming(0, {
      duration: 400,
    });
  };

  const hideDrawer = () => {
    setIsDrawerOpen(false);
    drawerPositon.value = withTiming(screenWidth, {
      duration: 400,
    });
  };

  return (
    <Animated.View style={[styles.drawerStyle, animatedDrawerStyle]}>
      {/* Area to tap to hideDrawer */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={hideDrawer}
        style={{flex: 1}}
      />

      {/* Reports Sections */}
      <View
        style={{
          backgroundColor: Colors.primary,
          flex: 2,
        }}>
        <ReportCard />
      </View>
    </Animated.View>
  );
}
