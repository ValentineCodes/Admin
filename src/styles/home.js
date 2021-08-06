import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 25,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  marker: {width: 30, height: 30, borderRadius: 100},
  drawerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  popUpContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
  },
  reportsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: Colors.secondaryTransparent,
    color: 'white',
    width: '60%',
    borderRadius: 20,
    height: 35,
    paddingLeft: 10,
    elevation: 5,
  },
  reportContainer: {
    height: '70%',
    width: '90%',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
  },
  reportLabel: {
    fontWeight: 'bold',
    fontSize: screenWidth / 20,
    color: 'rgba(255,255,255,1)',
    marginTop: 20,
  },
  reportMsg: {
    color: 'white',
    marginTop: 10,
  },
  imageContainer: {
    width: screenWidth / 5,
    height: screenWidth / 5,
    marginRight: 10,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    elevation: 10,
  },
  reportImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
