import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IconButton from "../components/IconButton";
import Colors from "../constants/Colors";
import CommunityScreen from "../screens/Community";
import CommunityThreadScreen from "../screens/CommunityThread";
import ConflictResolutionScreen from "../screens/ConflictResolution";
import PracticeScreen from "../screens/Practice";
import { RootStackParamList, TabParamList } from "../types";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CommunityThread"
        component={CommunityThreadScreen}
        options={{
          title: "Thread",
          headerLeft: () => (
            <IconButton
              onPress={navigation.goBack}
              name="chevron-left"
              size={30}
              color={Colors.bluegreen}
            />
          ),
          headerTintColor: Colors.bluegreen,
          headerTitleStyle: {
            fontFamily: "regular",
            fontSize: 18,
            color: Colors.darkgreen,
          },
        }}
      />
    </RootStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
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
      <Tab.Screen
        name="ConflictResolution"
        component={ConflictResolutionScreen}
        options={{
          title: "Conflict Resolution",
          headerTitle: "Resolution History",
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          title: "Practice",
        }}
      />
    </Tab.Navigator>
  );
}
