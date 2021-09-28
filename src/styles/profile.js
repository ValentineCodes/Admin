import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../constants/colors';
const SCREENWIDTH = Dimensions.get('screen').width;
const SCREENHEIGHT = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingVertical: 30,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT * 0.4,
  },
  scrollView: {
    alignItems: 'center',
    width: SCREENWIDTH,
    paddingBottom: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ccc',
    marginLeft: 20,
  },
  data: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
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
