import Router from "./router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './store'

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

export default function App() {
  return (
    <Provider store={ store }>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="auto" animated />
          <Router />  
      </PersistGate>
    </Provider>  
  );
}


