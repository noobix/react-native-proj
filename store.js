import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from './reducer';

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}
const persisted_reducers = persistReducer(persistConfig, authReducer)
export const store = createStore(persisted_reducers, applyMiddleware(thunk))
export const persistor = persistStore(store)