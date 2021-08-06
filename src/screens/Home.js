import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  TextInput,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import MapView, {Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';

import {styles} from '../styles/home';
import {mapStyle} from '../styles/map';

import {Colors} from '../constants/colors';

import ReportCard from '../components/ReportCard';
import Chat from '../components/Chat';

const initialRegion = {
  latitude: 6.39067,
  longitude: 6.94409,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const screenWidth = Dimensions.get('screen').width;

export default function Home() {
  const [reports, setReports] = useState([
    {
      image: require('../images/image.jpg'),
      name: 'Valentine Orga',
      address: 'Wall Street',
      location: {
        latitude: 6.39067,
        longitude: 6.94409,
      },
    },
    {
      image: require('../images/image.jpg'),
      name: 'Ebube Boss',
      address: 'Wall Street',
      location: {
        latitude: 6.39067,
        longitude: 6.94409,
      },
    },
    {
      image: require('../images/Codm.png'),
      name: 'Somto Goat',
      address: 'Wall Street',
      location: {
        latitude: 6.39067,
        longitude: 6.94409,
      },
    },
    {
      image: require('../images/image.jpg'),
      name: 'Somto Somto',
      address: 'Wall Street',
      location: {
        latitude: 6.39067,
        longitude: 6.94409,
      },
    },
    {
      image: require('../images/image.jpg'),
      name: 'Steve Money Man',
      address: 'Wall Street',
      location: {
        latitude: 6.39067,
        longitude: 6.94409,
      },
    },
  ]);
  const cases = useSelector(state => state.reports);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [viewReportData, setViewReportData] = useState(false);

  const _map = useRef(null);

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
    Keyboard.dismiss();
    setIsDrawerOpen(false);
    setSearchText('');
    drawerPositon.value = withTiming(screenWidth, {
      duration: 400,
    });
    setSearchResults([]);
  };

  const showMyLocation = location => {
    if (_map.current) {
      _map.current.animateCamera(
        {
          center: {
            latitude: location.lat,
            longitude: location.long,
          },
          zoom: 15,
        },
        5000,
      );
    }
    hideDrawer();
  };

  const viewReport = () => {
    setViewReportData(true);
  };

  const searchReports = searchText => {
    setSearchText(searchText);
    if (searchText.trim() == '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        cases.filter(user => {
          if (
            user.name
              .toLowerCase()
              .includes(searchText.toLowerCase().trim()) === true
          ) {
            return true;
          } else if (
            user.address
              .toLowerCase()
              .includes(searchText.toLowerCase().trim()) === true
          ) {
            return true;
          } else {
            return false;
          }
        }),
      );
    }
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (viewReportData) {
      setViewReportData(false);
    } else if (isDrawerOpen) {
      hideDrawer();
    } else {
      BackHandler.exitApp();
    }

    return true;
  });

  useEffect(() => {
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        customMapStyle={mapStyle}
        ref={_map}
        showsCompass={false}
        initialRegion={initialRegion}>
        {cases.map(report => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.coords[0].lat,
              longitude: report.coords[0].long,
            }}
            title="Help!">
            <Image
              source={require('../images/image.jpg')}
              style={styles.marker}
            />
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      {/* <View style={styles.headerContainer}> */}
      <Text style={styles.logo}>ADMIN</Text>

      {/* <TouchableOpacity activeOpacity={0.5} onPress={showDrawer}>
          <Icon
            name="alert-circle-outline"
            type="ionicon"
            color="rgba(255,255,255,0.7)"
            size={30}
          />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={showDrawer}
        style={{position: 'absolute', bottom: 15, right: 15}}>
        <Icon
          reverse
          name="alert-circle-outline"
          type="ionicon"
          color="rgba(225,0,0,0.7)"
          size={30}
        />
      </TouchableOpacity>

      {/* Drawer */}
      <Animated.View style={[styles.drawerStyle, animatedDrawerStyle]}>
        {/* Area to tap to hideDrawer */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={hideDrawer}
          style={{flex: 1}}
        />

        {/* Reports Section */}
        <View
          style={{
            backgroundColor: Colors.primary,
            flex: 3,
          }}>
          <View style={styles.reportsHeader}>
            <Text
              style={{
                color: 'red',
                fontSize: screenWidth / 15,
                fontWeight: 'bold',
              }}>
              Reports
            </Text>

            {/* Search Bar */}
            <TextInput
              placeholder="Search Name/Address"
              style={styles.searchBar}
              onChangeText={searchReports}
              value={searchText}
            />
          </View>

          <FlatList
            data={searchResults.length == 0 ? cases : searchResults}
            keyExtractor={report => Math.random().toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity onPress={viewReport}>
                <ReportCard reportData={item} showMyLocation={showMyLocation} />
              </TouchableOpacity>
            )}
          />
        </View>
      </Animated.View>

      {/* Components below pop up */}

      {/* Chat Popup */}
      {viewReportData ? <Chat setViewReportData={setViewReportData} /> : null}

      {/* Profile Image Popup */}
      {viewImage ? (
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setViewImage(false)}
          style={styles.popUpContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.image}>
            <Image
              source={reports[imageIndex].image}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
