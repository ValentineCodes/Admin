import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {paddingVertical: 40},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
    width: '100%',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  video: {width: '100%', height: 300, backgroundColor: 'black'},
  description: {
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
