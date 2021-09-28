import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const SCREENWIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputField: {
    marginTop: 20,
    paddingHorizontal: 15,
    color: 'black',
    fontSize: 20,
  },
});
