import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Login from "../screens/Login";
import Register from "../screens/Register";
import OnboardingParent from "../screens/OnboardingParent";
import OnboardingChild from "../screens/OnboardingChild";


const LoginStack = createStackNavigator();

const LoginRegister = () => {
    
    return (
    <LoginStack.Navigator
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
          elevation: 6,
        },
        headerTitleAlign: "center",
      }}
    >
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="Register"
        component={Register}
        options={{
            headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="OnboardingParent"
        component={OnboardingParent}
        options={{
            headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="OnboardingChild"
        component={OnboardingChild}
        options={{
            headerShown: false,
        }}
      />
    </LoginStack.Navigator>
  );
};

export { LoginRegister };
