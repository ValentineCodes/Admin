import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  TextInput,
  Keyboard,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import MapView, {Marker} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import GetLocation from 'react-native-get-location';

import {styles} from '../styles/home';
import {mapStyle} from '../styles/map';

import {Colors} from '../constants/colors';

import ReportCard from '../components/ReportCard';

const initialRegion = {
  latitude: 6.39067,
  longitude: 6.94409,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const screenWidth = Dimensions.get('screen').width;

export default function Home({navigation}) {
  const reports = useSelector(state => state.reports);

  const [myLocation, setMyLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const mapView = useRef();

  const drawerPositon = useSharedValue(screenWidth);
  const drawerOpacity = useSharedValue(0);

  const animatedDrawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drawerPositon.value}],
    };
  });

  const animatedDrawerOpacity = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0,0,0,${drawerOpacity.value})`,
    };
  });

  const showDrawer = () => {
    setIsDrawerOpen(true);
    drawerPositon.value = withTiming(0, {
      duration: 400,
    });

    drawerOpacity.value = withTiming(0.5, {
      duration: 780,
    });
  };

  const hideDrawer = () => {
    Keyboard.dismiss();
    setIsDrawerOpen(false);
    setSearchText('');
    drawerPositon.value = withTiming(screenWidth, {
      duration: 400,
    });
    drawerOpacity.value = withTiming(0, {
      duration: 100,
    });

    setSearchResults([]);
  };

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
    })
      .then(location => {
        setMyLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });

        // Center location on the map
        mapView.current.animateToRegion(
          {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          500,
        );
      })
      .catch(error => {
        ToastAndroid.show(
          'Unable to get location. Ensure your Location and Data Connectivity is ON.',
          ToastAndroid.LONG,
        );
      });
  };

  const showMyLocation = async () => {
    /// Center my location on map
    if (myLocation.latitude === null) {
      ToastAndroid.show('Getting Location...', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Updating Location...', ToastAndroid.LONG);
      // Animate to my location
      mapView.current.animateToRegion(
        {
          latitude: myLocation.latitude,
          longitude: myLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500,
      );
    }

    try {
      let permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (permission) {
        // Getting location
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 30000,
        })
          .then(location => {
            setMyLocation({
              latitude: location.latitude,
              longitude: location.longitude,
            });

            // Center location on the map
            mapView.current.animateToRegion(
              {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              500,
            );
          })
          .catch(error => {
            ToastAndroid.show(
              'Unable to get location. Ensure your Location and Data Connectivity is ON.',
              ToastAndroid.LONG,
            );
          });
        //
      } else {
        permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (permission === 'granted') {
          // Getting location
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
          })
            .then(location => {
              setMyLocation({
                latitude: location.latitude,
                longitude: location.longitude,
              });

              // Center location on the map
              mapView.current.animateToRegion(
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                },
                500,
              );
            })
            .catch(error => {
              ToastAndroid.show(
                'Unable to get location. Ensure your Location and Data Connectivity is ON.',
                ToastAndroid.LONG,
              );
            });
          //
        } else if (permission === 'denied') {
          return;
        } else {
          return;
        }
      }
    } catch (err) {
      ToastAndroid.show(
        'Something went wrong. Please Try Again',
        ToastAndroid.LONG,
      );
    }
  };

  const showUserLocation = location => {
    mapView.current.animateToRegion(
      {
        latitude: location.lat,
        longitude: location.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      500,
    );
    hideDrawer();
  };

  const searchReports = searchText => {
    setSearchText(searchText);
    if (searchText.trim() == '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        reports.filter(user => {
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

  const renderMarkers = () => {
    return reports.map(report => (
      <Marker
        key={report.id}
        coordinate={{
          latitude: report.coords[0].lat,
          longitude: report.coords[0].long,
        }}
        title="Help!"
      />
    ));
  };

  const renderMyLocationMarker = () => {
    if (myLocation.latitude && myLocation.longitude) {
      return (
        <Marker coordinate={myLocation} title="My Location" pinColor="blue" />
      );
    } else {
      return null;
    }
  };

  const renderItem = ({item}) => (
    <ReportCard
      id={item.id}
      uID={item.uID}
      name={item.name}
      address={item.address}
      lat={item.coords[0].lat}
      long={item.coords[0].long}
      timeInSec={item.timestamp.seconds}
      showUserLocation={showUserLocation}
      navigation={navigation}
    />
  );
  const renderKeyExtractor = report => report.id;

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (isProfileVisible) {
      hideProfile();
    } else if (isDrawerOpen) {
      hideDrawer();
    } else {
      BackHandler.exitApp();
    }

    return true;
  });

  useEffect(() => {
    showMyLocation();
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        // customMapStyle={mapStyle}
        ref={mapView}
        showsCompass={false}
        initialRegion={initialRegion}>
        {/* <MapViewDirections
          origin={{latitude: 37.3318456, longitude: -122.0296002}}
          destination={{latitude: 37.771707, longitude: -122.4053769}}
          apikey="AIzaSyD8V_83xsWw8BjZz6F6w-gKgvk8IeBTDic"
          strokeWidth={2}
        /> */}
        {renderMarkers()}

        {renderMyLocationMarker()}
      </MapView>

      <View style={styles.header}>
        <Text style={styles.logo}>ADMIN</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Users')}>
          <Icon name="people-outline" type="ionicon" color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={showMyLocation}
        style={styles.hoverIconLocation}>
        <Icon
          reverse
          raised
          name="street-view"
          type="font-awesome"
          color="rgba(255,255,255,1)"
          reverseColor={Colors.secondary}
          size={27}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={showDrawer}
        style={styles.hoverIconReports}>
        <Icon
          reverse
          raised
          name="alert-circle-outline"
          type="ionicon"
          color="rgba(219,011,0,1)"
          size={27}
        />
      </TouchableOpacity>

      {/* Drawer */}
      <Animated.View style={[styles.drawerStyle, animatedDrawerStyle]}>
        {/* Area to tap to hideDrawer */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={hideDrawer}
          style={{flex: 1}}>
          <Animated.View style={[animatedDrawerOpacity, {flex: 1}]} />
        </TouchableOpacity>
        {/* Reports Section */}
        <View style={styles.reportsSection}>
          {/* Search Bar */}
          <TextInput
            placeholder="Search Name/Address"
            style={styles.searchBar}
            onChangeText={searchReports}
            value={searchText}
          />

          <FlatList
            data={searchResults.length == 0 ? reports : searchResults}
            keyExtractor={renderKeyExtractor}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>
      </Animated.View>
    </View>
  );
}
