import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function _getReports() {
  firestore()
    .collection('reports')
    .get()
    .then(querySnapshot => console.log(querySnapshot.data()))
    .catch(err => console.log('Error:', err));
}
