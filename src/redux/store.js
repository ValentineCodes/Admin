import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducers
import reports from '../redux/reducers/reports';
import users from '../redux/reducers/users';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({users, reports});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
