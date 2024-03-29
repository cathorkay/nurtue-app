import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import AddFamilyMember from "../screens/AddFamilyMember";

const ProfileStack = createStackNavigator();

const Profiles = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <ProfileStack.Screen
        name="AddFamilyMember"
        component={AddFamilyMember}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export { Profiles };
