import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
  image: {
    width: '100%',
    height: '40%',
    backgroundColor: 'black',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  number: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nin: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
