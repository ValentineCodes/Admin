import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const SCREENWIDTH = Dimensions.get('screen').width;
const SCREENHEIGHT = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 15,
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  imageModal: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    width: 70,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  caption: {
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
