import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";

import Colors from "../constants/Colors";

export interface BlueBorderViewProps extends ViewProps {
  containerStyle?: ViewProps["style"];
  innerContainerStyle?: ViewProps["style"];
}

const BlueBorderView: React.FC<BlueBorderViewProps> = ({
  style,
  containerStyle,
  innerContainerStyle,
  children,
  ...restProps
}) => {
  return (
    <View style={[styles.container, containerStyle]} {...restProps}>
      <LinearGradient
        style={[styles.gradient, style]}
        start={[0, 0]}
        end={[1, 0]}
        colors={["#5EC1E8", "#9AEAEF", "#5EC1E8"]}
      >
        <View style={[styles.innerContainer, innerContainerStyle]}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
  },
  gradient: {
    borderRadius: 20,
    padding: 4,
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: 17,
    padding: 15,
  },
});

export default BlueBorderView;
