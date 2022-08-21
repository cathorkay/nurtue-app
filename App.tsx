import "react-native-get-random-values";
import "react-native-gesture-handler";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Button } from "react-native";
import replaceAll from "string.prototype.replaceall";
import * as Font from 'expo-font';

import { persistor, store } from "./data/store";
import useCachedResources from "./lib/useCachedResources";
import Navigation from "./navigation";
import Register from './screens/Register';
import Login from './screens/Login';
import { NavigationContainer, StackActions } from "@react-navigation/native";
import OnboardingParent from "./screens/OnboardingParent";
import OnboardingChild from "./screens/OnboardingChild";


dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
replaceAll.shim();


export default function App() {
  
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}> 
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <OnboardingParent/>
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
