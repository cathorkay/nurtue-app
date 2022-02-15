import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colors from "../constants/Colors";
import CommunityScreen from "../screens/Community";
import ConflictResolutionScreen from "../screens/ConflictResolution";
import PracticeScreen from "../screens/Practice";
import { RootStackParamList, RootTabParamList } from "../types";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.orange,
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopColor: "transparent",
          position: "absolute",
          height: 90,
          shadowColor: "rgb(130, 130, 130)",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 100,
        },
        tabBarLabelStyle: {
          fontFamily: "semibold",
          fontSize: 12,
        },
        headerStyle: {
          shadowColor: "rgba(190, 190, 190, 0.5)",
          shadowRadius: 20,
        },
        headerTitleStyle: {
          fontFamily: "regular",
          fontSize: 18,
          color: Colors.darkgreen,
        },
      }}
    >
      <BottomTab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: "Community",
          headerTitle: "nurtue",
          headerTitleStyle: {
            fontFamily: "Hero Bold",
            fontSize: 24,
            color: Colors.green,
          },
        }}
      />
      <BottomTab.Screen
        name="ConflictResolution"
        component={ConflictResolutionScreen}
        options={{
          title: "Conflict Resolution",
          headerTitle: "Resolution History",
        }}
      />
      <BottomTab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          title: "Practice",
        }}
      />
    </BottomTab.Navigator>
  );
}
