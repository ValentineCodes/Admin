import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  popUpContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  reportContainer: {
    height: '70%',
    width: '90%',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 100,
    width: screenWidth / 10,
    height: screenWidth / 10,
  },
  avatar: {width: '100%', height: '100%', borderRadius: 100},
  name: {
    fontSize: screenWidth / 22,
    fontWeight: 'bold',
    color: 'white',
  },
  address: {
    fontSize: screenWidth / 30,
    color: '#ccc',
  },
  location: {
    marginHorizontal: 10,
  },
  timestamp: {
    color: 'white',
    fontSize: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
  },
});
