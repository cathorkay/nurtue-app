import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import CommunityScreen from "../screens/Community";
import CommunityThreadScreen from "../screens/CommunityThread";
import ConflictResolutionScreen from "../screens/ConflictResolution";
import FilterScreen from "../screens/Filter";
import NewPostScreen from "../screens/NewPost";
import PracticeScreen from "../screens/Practice";
import SearchScreen from "../screens/Search";
import { RootStackParamList, TabParamList } from "../types";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: Colors.bluegreen,
        headerTitleStyle: {
          fontFamily: "regular",
          fontSize: 18,
          color: Colors.darkgreen,
        },
        headerStyle: {
          shadowColor: "rgba(190, 190, 190, 0.5)",
          shadowRadius: 20,
        },
      }}
    >
      <RootStack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <RootStack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          title: "Filters",
          presentation: "modal",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 20,
              }}
              onPress={navigation.goBack}
              name="close"
              size={30}
              color={Colors.bluegreen}
            />
          ),
          headerRight: () => (
            <TextButton
              style={{
                marginRight: 20,
              }}
              onPress={navigation.goBack}
            >
              Save
            </TextButton>
          ),
        }}
      />
      <RootStack.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          title: "New Post",
          presentation: "modal",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 20,
              }}
              onPress={navigation.goBack}
              name="close"
              size={30}
              color={Colors.bluegreen}
            />
          ),
          headerRight: () => (
            <TextButton
              style={{
                marginRight: 20,
              }}
              onPress={navigation.goBack}
            >
              Post
            </TextButton>
          ),
        }}
      />
      <RootStack.Screen
        name="CommunityThread"
        component={CommunityThreadScreen}
        options={{
          title: "Thread",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={30}
              color={Colors.bluegreen}
            />
          ),
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
