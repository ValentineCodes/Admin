import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import firestore from '@react-native-firebase/firestore';

import User from '../components/User';

import {styles} from '../styles/users';

const DROPDOWN_ITEMS = ['Name', 'Address', 'Email', 'Number', 'NIN'];

export default ({navigation}) => {
  const [searchTxt, setSearchTxt] = useState('');
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState([]);

  const searchTitle = useRef('Name');

  const displayMsg = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const sendNotification = () => {
    navigation.navigate('Notification', {
      id: 'broadcast',
      name: 'Everyone',
    });
  };

  const search = searchTxt => {
    setSearchTxt(searchTxt);
    setFilter([]);
    if (searchTxt.trim() == '') {
      setSearchResults([]);
    } else {
      let field = searchTitle.current.toLowerCase();
      if (field === 'nin') {
        let results = users.filter(user =>
          `${user[field]}`
            .toLowerCase()
            .includes(searchTxt.toLowerCase().trim()),
        );

        setSearchResults(results);
      } else {
        let results = users.filter(user =>
          user[field].toLowerCase().includes(searchTxt.toLowerCase().trim()),
        );

        setSearchResults(results);
      }
    }
  };

  const showAll = () => {
    setFilter([]);
  };

  const showBlocked = () => {
    let blocked = users.filter(user => user.blocked);

    if (blocked.length === 0) {
      displayMsg('No blocked users');
    }

    setFilter(blocked);
  };

  const totalBlocked = () => {
    let count = users.filter(user => user.blocked).length;
    return count;
  };

  const renderKeyExtractor = user => user.id;
  const renderItem = ({item}) => {
    return <User user={item} navigation={navigation} />;
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.pop();

    return true;
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .orderBy('joinedOn', 'asc')
      .onSnapshot(snapshot => {
        // Get users from 'snapshot'
        const users = snapshot.docs.map(user => {
          const id = user.ref._documentPath._parts[1];
          return {id, ...user.data()};
        });
        setUsers(users);
      });
    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, []);

  let allColor =
    filter.length === 0
      ? {bgColor: 'rgba(0,0,255,0.1)', color: 'rgba(0,0,200,1)'}
      : {bgColor: 'white', color: 'black'};

  let blockedColor =
    filter.length !== 0
      ? {bgColor: 'rgba(0,0,255,0.1)', color: 'rgba(0,0,200,1)'}
      : {bgColor: 'white', color: 'black'};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableNativeFeedback onPress={() => navigation.pop()}>
          <View style={styles.headerEnds}>
            <Icon name="arrow-back-outline" type="ionicon" size={30} />
            <Text allowFontScaling={false} style={styles.headerText}>
              Users
            </Text>
          </View>
        </TouchableNativeFeedback>

        {/* Send Button */}
        <Icon
          name="notifications-outline"
          type="ionicon"
          size={27}
          onPress={sendNotification}
        />
      </View>

      {/* Search field */}

      <View style={styles.searchContainer}>
        <SelectDropdown
          data={DROPDOWN_ITEMS}
          defaultValue="Name"
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdownText}
          rowTextStyle={styles.rowTextStyle}
          onSelect={(selectedItem, index) => {
            searchTitle.current = selectedItem;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          renderDropdownIcon={() => (
            <Icon name="caret-down-outline" type="ionicon" size={11} />
          )}
        />

        {/* Search bar */}
        <SearchBar
          placeholder="Type Here..."
          onChangeText={search}
          value={searchTxt}
          lightTheme
          containerStyle={{flex: 1}}
        />
      </View>

      <View style={styles.bubblesContainer}>
        <TouchableOpacity
          onPress={showAll}
          style={{
            ...styles.bubble,
            minWidth: 50,
            backgroundColor: allColor.bgColor,
            color: allColor.color,
          }}>
          <Text>All</Text>
          <Text style={styles.count}>{users.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showBlocked}
          style={{
            ...styles.bubble,
            marginLeft: 10,
            backgroundColor: blockedColor.bgColor,
            color: blockedColor.color,
          }}>
          <Text>Blocked</Text>
          <Text style={styles.count}>{totalBlocked()}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          filter.length === 0
            ? searchResults.length === 0
              ? users
              : searchResults
            : filter
        }
        contentContainerStyle={{paddingBottom: 50}}
        keyExtractor={renderKeyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};
