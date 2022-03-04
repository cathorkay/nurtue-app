import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import AgreementDetailScreen from "../screens/AgreementDetail";
import CommunityScreen from "../screens/Community";
import CommunityThreadScreen from "../screens/CommunityThread";
import ConflictResolutionScreen from "../screens/ConflictResolution";
import FilterScreen from "../screens/Filter";
import NewAgreementScreen from "../screens/NewAgreement";
import NewPostScreen from "../screens/NewPost";
import PracticeScreen from "../screens/Practice";
import PracticePreviewScreen from "../screens/PracticePreview";
import PracticeQuestionScreen from "../screens/PracticeQuestion";
import ProfileScreen from "../screens/Profile";
import SearchScreen from "../screens/Search";
import {
  AgreementStackParamList,
  ProfileStackParamList,
  RootStackParamList,
  SearchStackParamList,
  TabParamList,
} from "../types/navigation";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

const iconSize = 30;

function RootNavigator() {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: Colors.bluegreen,
        headerTitleStyle: {
          fontFamily: "medium",
          fontSize: FontSize.emphasis,
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
        name="SearchStack"
        component={Searches}
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
              size={iconSize}
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
          gestureEnabled: false,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 20,
              }}
              name="close"
              size={iconSize}
              color={Colors.bluegreen}
            />
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
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="PracticePreview"
        component={PracticePreviewScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="PracticeQuestion"
        component={PracticeQuestionScreen}
        options={({ route }) => ({
          title: route.params.topic,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="close"
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
        })}
      />
      <RootStack.Screen
        name="AgreementDetail"
        component={AgreementDetailScreen}
        options={{
          title: "Our Agreement",
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              onPress={navigation.goBack}
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="AgreementStack"
        component={Agreements}
        options={{
          presentation: "modal",
          title: "New Agreement",
          headerTransparent: true,
          gestureEnabled: false,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="close"
              onPress={() => navigation.navigate("Tabs")}
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
      <RootStack.Screen
        name="ProfileStack"
        component={Profiles}
        options={{
          presentation: "modal",
          title: "My Profile",
          gestureEnabled: false,
          headerLeft: () => (
            <IconButton
              style={{
                marginLeft: 10,
              }}
              name="close"
              onPress={() => navigation.navigate("Tabs")}
              size={iconSize}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
    </RootStack.Navigator>
  );
}

const AgreementStack = createStackNavigator<AgreementStackParamList>();

const Agreements = () => {
  return (
    <AgreementStack.Navigator>
      <AgreementStack.Screen
        name="NewAgreement"
        component={NewAgreementScreen}
        initialParams={{
          step: 0,
        }}
        options={{
          headerShown: false,
        }}
      />
    </AgreementStack.Navigator>
  );
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const Profiles = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const SearchStack = createStackNavigator<SearchStackParamList>();

const Searches = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: Colors.bluegreen,
        headerTitleStyle: {
          fontFamily: "medium",
          fontSize: FontSize.emphasis,
          color: Colors.darkgreen,
        },
        headerStyle: {
          shadowColor: "rgba(190, 190, 190, 0.5)",
          shadowRadius: 20,
        },
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
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
              name="chevron-left"
              size={iconSize + 6}
              color={Colors.bluegreen}
            />
          ),
        }}
      />
    </SearchStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: "#8E8E8F",
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopColor: "transparent",
          position: "absolute",
          height: insets.bottom === 0 ? 50 : 84,
          shadowColor: "rgb(130, 130, 130)",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.15,
          shadowRadius: 100,
        },
        tabBarLabelStyle: {
          fontFamily: "medium",
          fontSize: 12,
        },
        headerStyle: {
          shadowColor: "rgba(190, 190, 190, 0.5)",
          shadowRadius: 20,
        },
        headerTitleStyle: {
          fontFamily: "medium",
          fontSize: FontSize.emphasis,
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
            fontSize: 27,
            color: Colors.green,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: FontSize.title + 2, height: FontSize.title + 2 }}
              source={
                focused
                  ? require("../assets/images/community-icon-colored.png")
                  : require("../assets/images/community-icon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="ConflictResolution"
        component={ConflictResolutionScreen}
        options={{
          title: "Conflict Resolution",
          headerTitle: "Agreement History",
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: FontSize.title, height: FontSize.title }}
              source={
                focused
                  ? require("../assets/images/conflict-resolution-icon-colored.png")
                  : require("../assets/images/conflict-resolution-icon.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          title: "Practice",
          tabBarIcon: ({ focused }) => (
            <Image
              style={{ width: FontSize.title - 2, height: FontSize.title - 2 }}
              source={
                focused
                  ? require("../assets/images/practice-icon-colored.png")
                  : require("../assets/images/practice-icon.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
