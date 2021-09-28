import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const SCREENWIDTH = Dimensions.get('screen').width;
const SCREENHEIGHT = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  headerEnds: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dropdown: {width: 110, height: 20},
  dropdownText: {fontSize: 13, fontWeight: 'bold'},
  rowTextStyle: {color: 'black', fontSize: 15},
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bubblesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
  },
  bubble: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  count: {
    color: 'black',
    borderRadius: 20,
    marginLeft: 10,
  },
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
  imageModal: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
  },
});
